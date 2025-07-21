import React from "react";
import { getCategories } from "../libs/data";
import CreateSeriesForm from "./CreateSeriesForm";

const page = async () => {
  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Series</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800">
            <strong>Peringatan:</strong> Belum ada kategori yang tersedia. Anda perlu membuat kategori terlebih dahulu sebelum menambahkan series.
          </p>
          <div className="mt-4">
            <a href="/admin/categories/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Buat Kategori Baru
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <CreateSeriesForm categories={categories} />;
};

export default page;
