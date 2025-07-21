import React from "react";
import Link from "next/link";
import { getMaterials, getCategories, getSeries } from "@/lib/data";
import { MaterialCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const page = async () => {
  const [materials, categories, series] = await Promise.all([
    getMaterials(), 
    getCategories(), 
    getSeries()
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Materi Pembelajaran</h1>
          <p className="text-gray-600">Temukan berbagai materi pembelajaran yang tersedia</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">Kembali ke Dashboard</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <h3 className="text-2xl font-bold text-green-600">{materials.length}</h3>
            <p className="text-gray-600">Total Materi</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-600">{series.length}</h3>
            <p className="text-gray-600">Series</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-600">{materials.filter((m) => m.youtube_url).length}</h3>
            <p className="text-gray-600">Video</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-600">{materials.filter((m) => m.pdf_url).length}</h3>
            <p className="text-gray-600">PDF</p>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filter berdasarkan kategori:</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/dashboard/materials">
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                Semua ({materials.length})
              </Badge>
            </Link>
            {categories.map((category) => (
              <Link key={category.id} href={`/dashboard/categories/${category.id}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  {category.name} ({category.series?.reduce((total, series) => total + (series.materials?.length || 0), 0) || 0})
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Materials Grid */}
      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {materials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada materi</h3>
            <p className="text-gray-500 mb-4">Materi pembelajaran belum tersedia. Silakan hubungi administrator.</p>
            <Link href="/dashboard/categories">
              <Button>Jelajahi Kategori</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
