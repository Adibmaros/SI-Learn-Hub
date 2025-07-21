import React from "react";
import Link from "next/link";
import { getCategories } from "@/lib/data";
import { CategoryCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";

const page = async () => {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kategori Pembelajaran</h1>
          <p className="text-gray-600">Jelajahi berbagai kategori materi pembelajaran yang tersedia</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">Kembali ke Dashboard</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-2xl font-bold text-blue-600">{categories.length}</h3>
            <p className="text-gray-600">Total Kategori</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-600">{categories.reduce((total, cat) => total + (cat.series?.length || 0), 0)}</h3>
            <p className="text-gray-600">Total Series</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-600">{categories.reduce((total, cat) => total + cat.series?.reduce((seriesTotal, series) => seriesTotal + (series.materials?.length || 0), 0), 0)}</h3>
            <p className="text-gray-600">Total Materi</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {categories?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada kategori</h3>
            <p className="text-gray-500 mb-4">Kategori pembelajaran belum tersedia. Silakan hubungi administrator.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
