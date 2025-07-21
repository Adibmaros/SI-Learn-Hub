import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaterialById } from "@/lib/data";
import { YouTubePlayer } from "@/components/dashboard/YouTubePlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPDFUrl } from "@/lib/supabase";

const Page = async ({ params }) => {
  const material = await getMaterialById(params.id);
  if (!material) notFound();

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* ===== BREADCRUMB ===== */}
      <nav className="mb-4 sm:mb-6 lg:mb-8" aria-label="Breadcrumb">
        <div className="overflow-x-auto scrollbar-hide">
          <ol className="inline-flex items-center text-xs sm:text-sm lg:text-base whitespace-nowrap min-w-max">
            <li>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
              <Link href="/dashboard/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                Kategori
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
              <Link href={`/dashboard/categories/${material.series.category.id}`} className="text-gray-700 hover:text-blue-600 transition-colors">
                <span className="truncate max-w-[100px] sm:max-w-none">{material.series.category.name}</span>
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
              <Link href={`/dashboard/series/${material.series.id}`} className="text-gray-700 hover:text-blue-600 transition-colors">
                <span className="truncate max-w-[120px] sm:max-w-none">{material.series.title}</span>
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
              <span className="text-gray-500 truncate max-w-[150px] sm:max-w-none">{material.title}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ===== HEADER ===== */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight break-words">{material.title}</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Link href={`/dashboard/categories/${material.series.category.id}`}>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200 transition-colors text-xs sm:text-sm">
                {material.series.category.name}
              </Badge>
            </Link>
            <Link href={`/dashboard/series/${material.series.id}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors text-xs sm:text-sm">
                {material.series.title}
              </Badge>
            </Link>
            <Badge variant="outline" className="text-xs sm:text-sm bg-blue-50 text-blue-700 border-blue-200">
              {material.duration} menit
            </Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 xl:flex-shrink-0">
          <Link href={`/dashboard/series/${material.series.id}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">Kembali ke Series</span>
              <span className="sm:hidden">Kembali</span>
            </Button>
          </Link>
          <Link href="/dashboard/materials" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors">
              <span className="hidden sm:inline">Lihat Semua Materi</span>
              <span className="sm:hidden">Semua Materi</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* ===== MAIN CONTENT ===== */}
        <div className="xl:col-span-2 space-y-6 sm:space-y-8">
          {/* Video */}
          {material.youtube_url && (
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Video Pembelajaran</h2>
              <div className="relative w-full">
                <YouTubePlayer url={material.youtube_url} title={material.title} />
              </div>
            </section>
          )}

          {/* Deskripsi */}
          {material.description && (
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg lg:text-xl">Deskripsi Materi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base lg:text-lg">{material.description}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ===== SIDEBAR ===== */}
        <div className="xl:col-span-1 space-y-6">
          {/* Informasi Materi */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Informasi Materi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm sm:text-base">
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Kategori</label>
                <Link href={`/dashboard/categories/${material.series.category.id}`}>
                  <p className="text-blue-600 hover:text-blue-800 transition-colors font-medium">{material.series.category.name}</p>
                </Link>
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Series</label>
                <Link href={`/dashboard/series/${material.series.id}`}>
                  <p className="text-blue-600 hover:text-blue-800 transition-colors font-medium break-words">{material.series.title}</p>
                </Link>
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Level</label>
                <p className="font-medium">{material.series.level}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Durasi</label>
                <p className="font-medium">{material.duration} menit</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Tanggal Dibuat</label>
                <p className="text-sm">
                  {new Date(material.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Terakhir Diupdate</label>
                <p className="text-sm">
                  {new Date(material.updatedAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Sumber Daya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {material.youtube_url && (
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Video YouTube</label>
                  <a href={material.youtube_url} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" size="sm" className="w-full hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      Buka di YouTube
                    </Button>
                  </a>
                </div>
              )}

              {material.pdf_url && (
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Dokumen PDF</label>
                  <Link href={getPDFUrl(material.pdf_url, "materials")} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" size="sm" className="w-full hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </Button>
                  </Link>
                </div>
              )}

              {!material.youtube_url && !material.pdf_url && (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500 text-sm">Tidak ada sumber daya tambahan.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
