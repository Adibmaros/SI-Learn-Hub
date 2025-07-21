import React, { Suspense } from "react";
import Link from "next/link";
import { getMaterials, getCategories, getSeries } from "@/lib/data";
import { MaterialCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Loading Components
const StatsLoading = () => (
  <div className="bg-green-50 rounded-lg p-6 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <Skeleton className="h-8 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

const CategoriesLoading = () => (
  <div className="mb-8">
    <Skeleton className="h-6 w-48 mb-4" />
    <div className="flex flex-wrap gap-2">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-6 w-20 rounded-full" />
      ))}
    </div>
  </div>
);

const MaterialsGridLoading = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="border rounded-lg p-4 space-y-3">
        <Skeleton className="h-32 w-full rounded" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </div>
    ))}
  </div>
);

// Data Components
const StatsSection = async () => {
  const [materials, series] = await Promise.all([getMaterials(), getSeries()]);

  return (
    <div className="bg-green-50 rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div>
          <h3 className="text-2xl font-bold text-green-600">{materials.length}</h3>
          <p className="text-gray-600">Total Materi</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-green-600">{series.length}</h3>
          <p className="text-gray-600">Series</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-green-600">{materials.filter((m) => m.youtube_url).length}</h3>
          <p className="text-gray-600">Video</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-green-600">{materials.filter((m) => m.pdf_url).length}</h3>
          <p className="text-gray-600">PDF</p>
        </div>
      </div>
    </div>
  );
};

const CategoriesSection = async () => {
  const [categories, materials] = await Promise.all([getCategories(), getMaterials()]);

  if (categories.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filter berdasarkan kategori:</h3>
      <div className="flex flex-wrap gap-2">
        <Link href="/dashboard/materials">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
            Semua ({materials.length})
          </Badge>
        </Link>
        {categories.map((category) => (
          <Link key={category.id} href={`/dashboard/categories/${category.id}`}>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
              {category.name} ({category.series?.reduce((total, series) => total + (series.materials?.length || 0), 0) || 0})
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

const MaterialsSection = async () => {
  const materials = await getMaterials();

  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada materi</h3>
          <p className="text-gray-500 mb-4">Materi pembelajaran belum tersedia. Silakan hubungi administrator.</p>
          <Link href="/dashboard/categories">
            <Button>Jelajahi Kategori</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {materials.map((material) => (
        <MaterialCard key={material.id} material={material} />
      ))}
    </div>
  );
};

// Main Page Component
const MaterialsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Materi Pembelajaran</h1>
          <p className="text-gray-600">Temukan berbagai materi pembelajaran yang tersedia</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">Kembali ke Dashboard</Button>
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
  );
};

export default MaterialsPage;
