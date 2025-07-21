import React from "react";
import { getMaterialById } from "../libs/data";
import { getSeriesData } from "../../series/libs/data";
import EditMaterialForm from "../components/EditMaterialForm";

const page = async ({ params }) => {
  const id = parseInt(params.id);
  const [material, series] = await Promise.all([getMaterialById(id), getSeriesData()]);

  if (!material) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Materi Tidak Ditemukan</h1>
        <p className="text-gray-600">Materi dengan ID {id} tidak ditemukan atau telah dihapus.</p>
        <div className="mt-4">
          <a href="/admin/materials" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Kembali ke Daftar Materi
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <EditMaterialForm material={material} series={series} />
    </div>
  );
};

export default page;
