import React, { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/data";
import { CategoryCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";

// Loading skeleton for stats section
const StatsSkeleton = () => (
  <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mb-8">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
      {[...Array(3)].map((_, i) => (
        <div key={i}>
          <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

// Loading skeleton for categories grid
const CategoriesGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-white border rounded-lg p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    ))}
  </div>
);

// Async component for stats
const StatsContent = async () => {
  const categories = await getCategories();

  return (
    <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-blue-600">{categories.length}</h3>
          <p className="text-sm sm:text-base text-gray-600">Total Kategori</p>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-blue-600">{categories.reduce((total, cat) => total + (cat.series?.length || 0), 0)}</h3>
          <p className="text-sm sm:text-base text-gray-600">Total Series</p>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-blue-600">{categories.reduce((total, cat) => total + cat.series?.reduce((seriesTotal, series) => seriesTotal + (series.materials?.length || 0), 0), 0)}</h3>
          <p className="text-sm sm:text-base text-gray-600">Total Materi</p>
        </div>
      </div>
    </div>
  );
};

// Async component for categories grid
const CategoriesContent = async () => {
  const categories = await getCategories();

  return categories?.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  ) : (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Belum ada kategori</h3>
        <p className="text-sm sm:text-base text-gray-500 mb-4">Kategori pembelajaran belum tersedia. Silakan hubungi administrator.</p>
      </div>
    </div>
  );
};

// Main page component with granular Suspense
const Page = () => {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header - Static content, no loading needed */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Kategori Pembelajaran</h1>
          <p className="text-sm sm:text-base text-gray-600">Jelajahi berbagai kategori materi pembelajaran yang tersedia</p>
        </div>
        <div className="self-start md:self-auto">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full md:w-auto">
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>
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
  );
};

export default Page;
