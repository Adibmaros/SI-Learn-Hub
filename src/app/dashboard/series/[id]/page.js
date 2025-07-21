import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeriesById } from "@/lib/data";
import { MaterialCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="mb-4 sm:mb-6">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6 sm:mb-8">
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="flex gap-2 mb-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* Materials section skeleton */}
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

// Main content component
const SeriesContent = async ({ seriesId }) => {
  const series = await getSeriesById(seriesId);
  if (!series) notFound();

  return (
    <>
      {/* ======== BREADCRUMB ======== */}
      <nav className="mb-4 sm:mb-6 overflow-x-auto" aria-label="Breadcrumb">
        <ol className="inline-flex items-center text-xs sm:text-sm md:text-base whitespace-nowrap">
          <li>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/dashboard/categories" className="text-gray-700 hover:text-blue-600">
              Kategori
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/dashboard/categories/${series.category.id}`} className="text-gray-700 hover:text-blue-600">
              {series.category.name}
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">{series.title}</span>
          </li>
        </ol>
      </nav>

      {/* ======== HEADER ======== */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6 sm:mb-8">
        {/* KIRI */}
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{series.name}</h1>
          {series.description && <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{series.description}</p>}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3">
              {series.level}
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3">
              {series.materials?.length || 0} Materi
            </Badge>
            <span className="text-xs sm:text-sm text-gray-500">{series.materials.duration} menit</span>
          </div>
          <div className="text-xs sm:text-sm md:text-base text-blue-600 font-medium">Kategori: {series.category.name}</div>
        </div>

        {/* KANAN */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
          <Link href={`/dashboard/categories/${series.category.id}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              Kembali ke Kategori
            </Button>
          </Link>
          <Link href="/dashboard/materials" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Lihat Semua Materi</Button>
          </Link>
        </div>
      </div>

      {/* ======== LIST MATERI ======== */}
      <section>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Materi dalam series ini</h2>

        {series.materials && series.materials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {series.materials.map((material) => (
              <MaterialCard key={material.id} material={{ ...material, series }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Belum ada materi</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4">Series ini belum memiliki materi pembelajaran. Silakan periksa kembali nanti.</p>
              <Link href="/dashboard/materials">
                <Button>Jelajahi Materi Lain</Button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

const Page = ({ params }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <Suspense fallback={<LoadingFallback />}>
        <SeriesContent seriesId={params.id} />
      </Suspense>
    </div>
  );
};

export default Page;
