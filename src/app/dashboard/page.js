import React, { Suspense } from "react";
import Link from "next/link";
import { getCategories, getMaterials, getSeries } from "@/lib/data";
import { CategoryCard, MaterialCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="animate-pulse">
      {/* Hero Section skeleton */}
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
        <div className="flex gap-4 justify-center">
          <div className="h-12 bg-gray-200 rounded w-32"></div>
          <div className="h-12 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* Categories Section skeleton */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 bg-gray-200 rounded"></div>
          ))}
        </div>
      </section>

      {/* Materials Section skeleton */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded w-56"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded"></div>
          ))}
        </div>
      </section>
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
    <>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Selamat Datang di SI Learn Hub</h1>
        <p className="text-xl text-gray-600 mb-8">Platform pembelajaran terbaik untuk mengembangkan kemampuan Sistem Informasi Anda</p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard/categories">
            <Button size="lg">Jelajahi Kategori</Button>
          </Link>
          <Link href="/dashboard/materials">
            <Button variant="outline" size="lg">
              Lihat Semua Materi
            </Button>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Kategori Pembelajaran</h2>
          <Link href="/dashboard/categories">
            <Button variant="outline">Lihat Semua</Button>
          </Link>
        </div>

        {featuredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Belum ada kategori tersedia</p>
          </div>
        )}
      </section>

      {/* Materials Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Materi Pembelajaran Terbaru</h2>
          <Link href="/dashboard/materials">
            <Button variant="outline">Lihat Semua</Button>
          </Link>
        </div>

        {featuredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMaterials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Belum ada materi tersedia</p>
          </div>
        )}
      </section>
    </>
  );
};

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingFallback />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
};

export default page;
