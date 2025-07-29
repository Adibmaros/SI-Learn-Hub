import React, { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/data";
import { CategoryCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, FileText, Plus, Search } from "lucide-react";

export const dynamic = "force-dynamic";

// Loading skeleton for stats section
const StatsSkeleton = () => (
  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100">
    <div className="grid grid-cols-3 gap-3 sm:gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="text-center">
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full mx-auto mb-2 animate-pulse"></div>
          <div className="h-5 sm:h-6 bg-gray-200 rounded-lg w-8 sm:w-12 mx-auto mb-1 sm:mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-16 sm:w-20 mx-auto animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

// Loading skeleton for categories grid
const CategoriesGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse shadow-sm">
        <div className="h-1 bg-gray-200 rounded-full w-full mb-6"></div>
        <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        <div className="flex gap-3 mb-6">
          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
      </div>
    ))}
  </div>
);

// Async component for stats
const StatsContent = async () => {
  const allCategories = await getCategories();

  // Filter categories yang nama nya mengandung string "semester"
  const categories = allCategories.filter((category) => category.name && category.name.toLowerCase().includes("semester"));

  const totalSeries = categories.reduce((total, cat) => total + (cat.series?.length || 0), 0);
  const totalMaterials = categories.reduce((total, cat) => total + cat.series?.reduce((seriesTotal, series) => seriesTotal + (series.materials?.length || 0), 0), 0);

  const stats = [
    {
      icon: BookOpen,
      value: categories.length,
      label: "Total Kategori",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Play,
      value: totalSeries,
      label: "Total Series",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: FileText,
      value: totalMaterials,
      label: "Total Materi",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100 shadow-sm">
      <div className="grid grid-cols-3 gap-3 sm:gap-6">
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

// Async component for categories grid
const CategoriesContent = async () => {
  const allCategories = await getCategories();

  // Filter categories yang nama nya mengandung string "semester"
  const categories = allCategories.filter((category) => category.name && category.name.toLowerCase().includes("semester"));

  return categories?.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  ) : (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada kategori</h3>
        <p className="text-gray-500 mb-6">Kategori pembelajaran dengan semester belum tersedia. Silakan hubungi administrator untuk menambahkan konten.</p>
      </div>
    </div>
  );
};

// Main page component with granular Suspense
const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header with enhanced styling */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Kategori Pembelajaran</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">Jelajahi berbagai kategori materi pembelajaran yang tersedia dan tingkatkan kemampuan Anda</p>

          {/* Navigation button to all materials */}
          <Link href="/dashboard/materials">
            <Button variant="outline" size="lg" className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300">
              <Search className="w-4 h-4" />
              Lihat Semua Materi
            </Button>
          </Link>
        </div>

        {/* Stats with Suspense */}
        <Suspense fallback={<StatsSkeleton />}>
          <StatsContent />
        </Suspense>

        {/* Categories Grid with Suspense */}
        <Suspense fallback={<CategoriesGridSkeleton />}>
          <CategoriesContent />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
