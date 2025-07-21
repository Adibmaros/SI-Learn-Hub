import Link from "next/link";
import React from "react";
import { getSeriesData } from "./libs/data";
import { getImageUrl } from "@/lib/supabase";
import DeleteSeriesForm from "./components/DeleteSeriesForm";

const page = async () => {
  const series = await getSeriesData();

  if (!series || series.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Manajemen Series</h1>
            <Link href="/admin/series/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + Tambah Series
            </Link>
          </div>
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Belum ada data series</div>
            <p className="text-gray-400 mt-2">Mulai dengan menambahkan series pertama</p>
          </div>
        </div>
      </div>
    );
  }

  // Group series by category
  const seriesByCategory = series.reduce((acc, serie) => {
    const categoryName = serie.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(serie);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Manajemen Series</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Total {series.length} series</p>
            <Link href="/admin/series/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + Tambah Series
            </Link>
          </div>
        </div>

        {/* Series by Category */}
        <div className="space-y-8">
          {Object.entries(seriesByCategory).map(([categoryName, categorySeriesData]) => (
            <div key={categoryName} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{categoryName}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categorySeriesData.map((serie) => (
                  <div key={serie.id} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {/* Thumbnail */}
                    {serie.thumbnail && (
                      <div className="aspect-video bg-gray-200">
                        <img src={getImageUrl(serie.thumbnail, "series")} alt={serie.name} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{serie.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Link href={`/admin/series/${serie.id}`} className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                            Edit
                          </Link>
                          <DeleteSeriesForm seriesId={serie.id} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Level:</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              serie.level === "BEGINNER" ? "bg-green-100 text-green-800" : serie.level === "INTERMEDIATE" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {serie.level}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Materi:</span>
                          <span className="font-medium">{serie.materials.length} video</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${serie.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{serie.isActive ? "Aktif" : "Nonaktif"}</span>
                        </div>

                        {serie.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{serie.description}</p>}

                        <div className="text-xs text-gray-400 mt-2">Dibuat: {new Date(serie.createdAt).toLocaleDateString("id-ID")}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
