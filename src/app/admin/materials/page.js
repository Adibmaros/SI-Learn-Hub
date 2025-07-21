import Link from "next/link";
import React from "react";
import { getMaterialData } from "./libs/data";
import { getPDFUrl } from "@/lib/supabase";
import DeleteMaterialForm from "./components/DeleteMaterialForm";

const page = async () => {
  const materials = await getMaterialData();

  if (!materials || materials.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Manajemen Materi</h1>
            <Link href="/admin/materials/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + Tambah Materi
            </Link>
          </div>
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Belum ada data materi</div>
            <p className="text-gray-400 mt-2">Mulai dengan menambahkan materi pertama</p>
          </div>
        </div>
      </div>
    );
  }

  // Group materials by series
  const materialsBySeries = materials.reduce((acc, material) => {
    const seriesName = material.series.name;
    const categoryName = material.series.category.name;
    const key = `${categoryName} - ${seriesName}`;
    if (!acc[key]) {
      acc[key] = {
        series: material.series,
        materials: [],
      };
    }
    acc[key].materials.push(material);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Manajemen Materi</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Total {materials.length} materi</p>
            <Link href="/admin/materials/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + Tambah Materi
            </Link>
          </div>
        </div>

        {/* Materials by Series */}
        <div className="space-y-8">
          {Object.entries(materialsBySeries).map(([key, { series, materials: seriesMaterials }]) => (
            <div key={key} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{series.name}</h2>
                  <p className="text-sm text-gray-500">
                    Kategori: {series.category.name} • Level: {series.level}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{seriesMaterials.length} materi</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {seriesMaterials.map((material) => (
                  <div key={material.id} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">{material.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/materials/${material.id}`} className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                          Edit
                        </Link>
                        <DeleteMaterialForm materialId={material.id} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {material.description && <p className="text-sm text-gray-600 line-clamp-2">{material.description}</p>}

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {material.youtube_url && (
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            <span>YouTube</span>
                          </div>
                        )}
                        {material.pdf_url && (
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z" />
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z" />
                            </svg>
                            <span>PDF</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Urutan:</span>
                        <span className="font-medium">#{material.orderIndex}</span>
                      </div>

                      {material.duration && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Durasi:</span>
                          <span className="font-medium">{Math.floor(material.duration / 60)} menit</span>
                        </div>
                      )}

                      <div className="text-xs text-gray-400">Dibuat: {new Date(material.createdAt).toLocaleDateString("id-ID")}</div>
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
