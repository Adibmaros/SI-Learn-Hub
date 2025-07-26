import React, { Suspense } from "react";
import Link from "next/link";
import { getMaterials, getCategories, getSeries } from "@/lib/data";
import { MaterialCard } from "./components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Play, FileText, Filter, ArrowLeft, Search } from "lucide-react";

export const dynamic = "force-dynamic";

// Loading Components
const StatsLoading = () => (
  <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-green-100">
    <div className="grid grid-cols-4 gap-3 sm:gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="text-center">
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full mx-auto mb-2 animate-pulse"></div>
          <div className="h-5 sm:h-6 bg-gray-200 rounded-lg w-8 sm:w-12 mx-auto mb-1 sm:mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-12 sm:w-16 mx-auto animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

const CategoriesLoading = () => (
  <div className="mb-6 sm:mb-8">
    <Skeleton className="h-5 sm:h-6 w-32 sm:w-48 mb-3 sm:mb-4" />
    <div className="flex flex-wrap gap-2">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-7 sm:h-8 w-16 sm:w-20 rounded-full" />
      ))}
    </div>
  </div>
);

const MaterialsGridLoading = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 animate-pulse">
        <Skeleton className="h-32 sm:h-40 w-full rounded-lg sm:rounded-xl" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    ))}
  </div>
);

// Data Components
const StatsSection = async () => {
  const [materials, series] = await Promise.all([getMaterials(), getSeries()]);

  const stats = [
    {
      icon: BookOpen,
      value: materials.length,
      label: "Total Materi",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Play,
      value: series.length,
      label: "Series",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Play,
      value: materials.filter((m) => m.youtube_url).length,
      label: "Video",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: FileText,
      value: materials.filter((m) => m.pdf_url).length,
      label: "PDF",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-green-100 shadow-sm">
      <div className="grid grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:shadow-md transition-shadow`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CategoriesSection = async () => {
  const [categories, materials] = await Promise.all([getCategories(), getMaterials()]);

  if (categories.length === 0) return null;

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filter Kategori</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/dashboard/materials">
          <Badge variant="default" className="cursor-pointer hover:bg-blue-600 transition-colors bg-blue-500 text-white border-0 px-3 py-1.5 rounded-full font-medium text-xs sm:text-sm">
            Semua ({materials.length})
          </Badge>
        </Link>
        {categories.map((category) => {
          const materialCount = category.series?.reduce((total, series) => total + (series.materials?.length || 0), 0) || 0;
          return (
            <Link key={category.id} href={`/dashboard/categories/${category.id}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors border-gray-200 px-3 py-1.5 rounded-full font-medium text-xs sm:text-sm">
                {category.name} ({materialCount})
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const MaterialsSection = async () => {
  const materials = await getMaterials();

  if (materials.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Belum ada materi</h3>
          <p className="text-sm sm:text-base text-gray-500 mb-6">Materi pembelajaran belum tersedia. Silakan hubungi administrator atau jelajahi kategori lainnya.</p>
          <Link href="/dashboard/categories">
            <Button className="bg-green-600 hover:bg-green-700 px-6 py-2.5 rounded-xl">
              <BookOpen className="w-4 h-4 mr-2" />
              Jelajahi Kategori
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {materials.map((material) => (
        <MaterialCard key={material.id} material={material} />
      ))}
    </div>
  );
};

// Main Page Component
const MaterialsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Materi Pembelajaran</h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">Temukan berbagai materi pembelajaran yang tersedia untuk meningkatkan kemampuan Anda</p>
          <Link href="/dashboard">
            <Button variant="outline" className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl border-gray-200 hover:bg-gray-50 text-sm sm:text-base">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>

        {/* Stats with Suspense */}
        <Suspense fallback={<StatsLoading />}>
          <StatsSection />
        </Suspense>

        {/* Categories Filter with Suspense */}
        <Suspense fallback={<CategoriesLoading />}>
          <CategoriesSection />
        </Suspense>

        {/* Materials Grid with Suspense */}
        <Suspense fallback={<MaterialsGridLoading />}>
          <MaterialsSection />
        </Suspense>
      </div>
    </div>
  );
};

export default MaterialsPage;
