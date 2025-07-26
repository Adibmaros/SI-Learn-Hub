import React from "react";
import Link from "next/link";
import { getCategories } from "./libs/data";
import DeleteCategoryForm from "./components/DeleteCategoryForm";

export const dynamic = "force-dynamic";

const page = async () => {
  const categories = await getCategories();
  console.log("Fetched categories:", categories);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Kategori Materi</h1>
        <Link href="/admin/categories/create" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium">
          + Tambah Kategori
        </Link>
      </div>

      {categories && categories.length > 0 ? (
        <div className="grid gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                  {category.description && category.description.trim() !== "" ? <p className="text-gray-600 mb-4">{category.description}</p> : <p className="text-gray-400 italic mb-4">Tidak ada deskripsi</p>}
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <span className="font-medium">Dibuat:</span>{" "}
                      {new Date(category.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p>
                      <span className="font-medium">Diperbarui:</span>{" "}
                      {new Date(category.updatedAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/categories/${category.id}`} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                    Edit
                  </Link>

                  {/* delete form */}
                  <DeleteCategoryForm categoryId={category.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada kategori</h3>
            <p className="text-gray-500 mb-6">Mulai dengan membuat kategori pertama untuk mengorganisir materi pembelajaran.</p>
            <Link href="/admin/categories/create" className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Buat Kategori Pertama
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
