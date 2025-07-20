import React from "react";
import { getCategoryById } from "../libs/data";
import EditCategoryForm from "../components/EditCategoryForm";

const page = async ({ params }) => {
  const { id } = params;
  const categoryId = parseInt(id);

  const category = await getCategoryById(categoryId);
  console.log("Fetched category:", category);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Kategori</h1>
          <p className="text-gray-600 mt-2">Perbarui informasi kategori materi pembelajaran</p>
        </div>

        {/* Pass category data to client component */}
        <EditCategoryForm category={category} />

        {/* Additional Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800 mb-1">Tips untuk Kategori</h3>
              <p className="text-sm text-blue-700">Gunakan nama yang jelas dan deskriptif untuk kategori. Hindari nama yang terlalu panjang dan pastikan mudah dipahami oleh pengguna.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
