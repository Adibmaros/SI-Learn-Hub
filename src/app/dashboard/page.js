import React from "react";
import Link from "next/link";
import { getCategories, getMaterials, getSeries } from "@/lib/data";
import { CategoryCard, MaterialCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";

const page = async () => {
  const [categories, materials, series] = await Promise.all([getCategories(), getMaterials(), getSeries()]);

  // Ambil 6 kategori dan 6 materi terbaru untuk ditampilkan di halaman utama
  const featuredCategories = categories.slice(0, 6);
  const featuredMaterials = materials.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );
};

export default page;
