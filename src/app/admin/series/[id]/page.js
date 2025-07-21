import React from "react";
import { getSeriesById, getCategories } from "../libs/data";
import EditSeriesForm from "../components/EditSeriesForm";

const page = async ({ params }) => {
  const id = parseInt(params.id);
  const [series, categories] = await Promise.all([
    getSeriesById(id),
    getCategories()
  ]);

  if (!series) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Series Tidak Ditemukan</h1>
        <p className="text-gray-600">Series dengan ID {id} tidak ditemukan atau telah dihapus.</p>
        <div className="mt-4">
          <a
            href="/admin/series"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Daftar Series
          </a>
        </div>
      </div>
    );
  }

  return <EditSeriesForm series={series} categories={categories} />;
};

export default page;
