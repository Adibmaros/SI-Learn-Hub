import React, { Suspense } from "react";
import Link from "next/link";
import { getCategories, getMaterials, getSeries } from "@/lib/data";
import { CategoryCard, MaterialCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <div className="animate-pulse space-y-8">
        {/* Hero Section skeleton */}
        <div className="text-center space-y-4">
          <div className="h-10 lg:h-12 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="h-12 bg-gray-200 rounded-lg w-full sm:w-40"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-full sm:w-40"></div>
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Categories Section skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main content component
const DashboardContent = async () => {
  const [categories, materials, series] = await Promise.all([getCategories(), getMaterials(), getSeries()]);

  // Ambil 6 kategori dan 6 materi terbaru untuk ditampilkan di halaman utama
  const featuredCategories = categories.slice(0, 6);
  const featuredMaterials = materials.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Selamat Datang di <span className="text-blue-600">SI Learn Hub</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Platform pembelajaran terbaik untuk mengembangkan kemampuan Sistem Informasi Anda</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/categories">
              <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
                Jelajahi Kategori
              </Button>
            </Link>
            <Link href="/dashboard/materials">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg font-semibold border-blue-600 text-blue-600 hover:bg-blue-50">
                Lihat Semua Materi
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm text-center">
            <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">{categories.length}</div>
            <div className="text-sm lg:text-base text-gray-600">Kategori</div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm text-center">
            <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-2">{series.length}</div>
            <div className="text-sm lg:text-base text-gray-600">Series</div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm text-center">
            <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-2">{materials.length}</div>
            <div className="text-sm lg:text-base text-gray-600">Materi</div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm text-center">
            <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-2">{materials.filter((m) => m.youtube_url).length}</div>
            <div className="text-sm lg:text-base text-gray-600">Video</div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Kategori Pembelajaran</h2>
            <Link href="/dashboard/categories">
              <Button variant="outline" className="w-full sm:w-auto">
                Lihat Semua Kategori
              </Button>
            </Link>
          </div>

          {featuredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">Belum ada kategori tersedia</div>
            </div>
          )}
        </div>

        {/* Materials Section */}
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Materi Pembelajaran Terbaru</h2>
            <Link href="/dashboard/materials">
              <Button variant="outline" className="w-full sm:w-auto">
                Lihat Semua Materi
              </Button>
            </Link>
          </div>

          {featuredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">Belum ada materi tersedia</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardContent />
    </Suspense>
  );
};

export default page;
