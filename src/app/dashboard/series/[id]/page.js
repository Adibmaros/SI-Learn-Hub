import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeriesById } from "@/lib/data";
import { MaterialCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Page = async ({ params }) => {
  const series = await getSeriesById(params.id);
  if (!series) notFound();

  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{series.title}</h1>
          {series.description && <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{series.description}</p>}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3">
              {series.level}
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3">
              {series.materials?.length || 0} Materi
            </Badge>
            <span className="text-xs sm:text-sm text-gray-500">{series.duration} menit</span>
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
    </div>
  );
};

export default Page;
