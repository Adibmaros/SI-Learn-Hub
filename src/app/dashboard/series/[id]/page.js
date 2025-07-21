import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeriesById } from "@/lib/data";
import { MaterialCard } from "@/components/dashboard/Cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const page = async ({ params }) => {
  const series = await getSeriesById(params.id);

  if (!series) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/dashboard/categories" className="text-gray-700 hover:text-blue-600">
                Kategori
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link href={`/dashboard/categories/${series.category.id}`} className="text-gray-700 hover:text-blue-600">
                {series.category.name}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500">{series.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{series.title}</h1>
          {series.description && <p className="text-gray-600 text-lg mb-4">{series.description}</p>}
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary" className="text-base px-3 py-1">
              {series.level}
            </Badge>
            <Badge variant="outline" className="text-base px-3 py-1">
              {series.materials?.length || 0} Materi
            </Badge>
            <span className="text-gray-500">{series.duration} menit</span>
          </div>
          <div className="text-blue-600 font-medium">Kategori: {series.category.name}</div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/categories/${series.category.id}`}>
            <Button variant="outline">Kembali ke Kategori</Button>
          </Link>
          <Link href="/dashboard/materials">
            <Button>Lihat Semua Materi</Button>
          </Link>
        </div>
      </div>

      {/* Materials Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Materi dalam series ini</h2>

        {series.materials && series.materials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.materials.map((material) => (
              <MaterialCard key={material.id} material={{ ...material, series }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada materi</h3>
              <p className="text-gray-500 mb-4">Series ini belum memiliki materi pembelajaran. Silakan periksa kembali nanti.</p>
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

export default page;
