import React from "react";
import { getSeriesData } from "../../series/libs/data";
import CreateMaterialForm from "./CreateMaterialForm";

const page = async () => {
  const series = await getSeriesData();

  if (!series || series.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Materi</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800">
            <strong>Peringatan:</strong> Belum ada series yang tersedia. Anda perlu membuat series terlebih dahulu sebelum menambahkan materi.
          </p>
          <div className="mt-4">
            <a href="/admin/series/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Buat Series Baru
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CreateMaterialForm series={series} />
    </div>
  );
};

export default page;
