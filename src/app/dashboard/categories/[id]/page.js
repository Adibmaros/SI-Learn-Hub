import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/data";
import { SeriesCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

// Loading component for the main content
const CategoryContentSkeleton = () => (
  <div className="container mx-auto px-4 py-6 sm:py-8">
    {/* Breadcrumb Skeleton */}
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </li>
      </ol>
    </nav>

    {/* Header Skeleton */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
      <div className="flex-1">
        <div className="h-8 bg-gray-200 rounded w-64 mb-3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mb-4 animate-pulse"></div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
      </div>
    </div>

    {/* Series Section Skeleton */}
    <section>
      <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-5 bg-gray-200 rounded w-16"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// Series Grid Loading Skeleton
const SeriesGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white border rounded-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    ))}
  </div>
);

// Async component for category content
const CategoryContent = async ({ id }) => {
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex mb-6 overflow-x-auto" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm sm:text-base">
          <li className="inline-flex items-center">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">
              Dashboard
            </Link>
          </li>
          <li>
            <div className="flex items-center whitespace-nowrap">
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/dashboard/categories" className="text-gray-700 hover:text-blue-600">
                Kategori
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center whitespace-nowrap">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500">{category.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{category.name}</h1>
          {category.description && <p className="text-sm sm:text-base text-gray-600 mb-4">{category.description}</p>}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-sm sm:text-base px-3 py-1">
              {category.series?.length || 0} Series
            </Badge>
            <Badge variant="outline" className="text-sm sm:text-base px-3 py-1">
              {category.series?.reduce((total, series) => total + (series.materials?.length || 0), 0) || 0} Materi
            </Badge>
            <span className="text-xs sm:text-sm text-gray-500">
              Dibuat:{" "}
              {new Date(category.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/dashboard/categories">
            <Button variant="outline" className="w-full sm:w-auto">
              Kembali ke Kategori
            </Button>
          </Link>
          <Link href="/dashboard/materials">
            <Button className="w-full sm:w-auto">Lihat Semua Materi</Button>
          </Link>
        </div>
      </div>

      {/* Series Section */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Series dalam kategori ini</h2>

        <Suspense fallback={<SeriesGridSkeleton />}>
          {category.series && category.series.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {category.series.map((series) => (
                <SeriesCard key={series.id} series={series} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Belum ada series</h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4">Kategori ini belum memiliki series pembelajaran. Silakan periksa kembali nanti.</p>
                <Link href="/dashboard/materials">
                  <Button>Jelajahi Materi Lain</Button>
                </Link>
              </div>
            </div>
          )}
        </Suspense>
      </section>
    </>
  );
};

// Main page component with Suspense
const Page = ({ params }) => {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <Suspense fallback={<CategoryContentSkeleton />}>
        <CategoryContent id={params.id} />
      </Suspense>
    </div>
  );
};

export default Page;
