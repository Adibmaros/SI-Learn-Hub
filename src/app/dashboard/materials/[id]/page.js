import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaterialById } from "@/lib/data";
import { YouTubePlayer } from "@/components/dashboard/YouTubePlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPDFUrl } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Loading skeleton for the entire page
const MaterialPageSkeleton = () => (
  <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
    {/* Breadcrumb Skeleton */}
    <nav className="mb-4 sm:mb-6 lg:mb-8" aria-label="Breadcrumb">
      <div className="overflow-x-auto scrollbar-hide">
        <ol className="inline-flex items-center text-xs sm:text-sm lg:text-base whitespace-nowrap min-w-max gap-2">
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={i}>
              <li>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </li>
              {i < 4 && <span className="text-gray-400">/</span>}
            </React.Fragment>
          ))}
        </ol>
      </div>
    </nav>

    {/* Header Skeleton */}
    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
      <div className="flex-1 min-w-0">
        <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4 animate-pulse"></div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 xl:flex-shrink-0">
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    </div>

    {/* Main Grid Skeleton */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
      {/* Main Content Skeleton */}
      <div className="xl:col-span-2 space-y-6 sm:space-y-8">
        {/* Video Skeleton */}
        <div>
          <div className="h-6 bg-gray-200 rounded w-40 mb-3 sm:mb-4 animate-pulse"></div>
          <div className="w-full aspect-video bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Description Card Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Skeleton */}
      <div className="xl:col-span-1 space-y-6">
        {/* Info Card Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resources Card Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

// Video section loading skeleton
const VideoSkeleton = () => (
  <section>
    <div className="h-6 bg-gray-200 rounded w-40 mb-3 sm:mb-4 animate-pulse"></div>
    <div className="relative w-full">
      <div className="w-full aspect-video bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
        <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </section>
);

// Description section loading skeleton
const DescriptionSkeleton = () => (
  <Card className="shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="pb-3 sm:pb-4">
      <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
);

// Async component for video section
const VideoSection = async ({ materialId }) => {
  const material = await getMaterialById(materialId);
  if (!material?.youtube_url) return null;

  return (
    <section>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">{material.title}</h2>
      <div className="relative w-full">
        <YouTubePlayer url={material.youtube_url} title={material.title} />
      </div>
    </section>
  );
};

// Async component for description section
const DescriptionSection = async ({ materialId }) => {
  const material = await getMaterialById(materialId);
  if (!material?.description) return null;

  return (
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
  );
};

// Async component for main material content
const MaterialContent = async ({ id }) => {
  const material = await getMaterialById(id);
  if (!material) notFound();

  return (
    <>
      {/* Breadcrumb */}
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
                <span className="truncate max-w-[120px] sm:max-w-none">{material.series.name}</span>
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
              <span className="text-gray-500 truncate max-w-[150px] sm:max-w-none">{material.title}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6 sm:space-y-8">
          {/* Video with Suspense */}
          <Suspense fallback={<VideoSkeleton />}>
            <VideoSection materialId={id} />
          </Suspense>

          {/* Description with Suspense */}
          <Suspense fallback={<DescriptionSkeleton />}>
            <DescriptionSection materialId={id} />
          </Suspense>
        </div>

        {/* Sidebar */}
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
                  <p className="text-blue-600 hover:text-blue-800 transition-colors font-medium break-words">{material?.series.name}</p>
                </Link>
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Level</label>
                <p className="font-medium">{material.series.level}</p>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Sumber Daya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              {!material.pdf_url && (
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
    </>
  );
};

// Main page component with Suspense
const Page = ({ params }) => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <Suspense fallback={<MaterialPageSkeleton />}>
        <MaterialContent id={params.id} />
      </Suspense>
    </div>
  );
};

export default Page;
