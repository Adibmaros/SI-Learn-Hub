"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { editSeriesAction } from "../libs/action";
import { getImageUrl } from "@/lib/supabase";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const initialState = {
  message: "",
  success: false,
  redirectUrl: "",
};

const UpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Loading..." : "Update Series"}
    </Button>
  );
};

const EditSeriesForm = ({ series, categories }) => {
  const editById = (prevState, formData) => editSeriesAction(prevState, formData, series?.id);
  const [state, formAction] = useActionState(editById, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push(state.redirectUrl);
    }
  }, [state.success, state.redirectUrl, router]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Series</h1>
      
      {state.message && (
        <div className={`p-3 mb-4 rounded-md ${
          state.success 
            ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700"
        }`}>
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Series *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={series?.name || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Contoh: Belajar React.js untuk Pemula"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
            Kategori *
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={series?.categoryId || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
            Level Kesulitan
          </label>
          <select
            id="level"
            name="level"
            defaultValue={series?.level || "BEGINNER"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="BEGINNER">Pemula</option>
            <option value="INTERMEDIATE">Menengah</option>
            <option value="ADVANCED">Lanjutan</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={series?.description || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Jelaskan detail series ini"
          />
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail Series
          </label>
          {series?.thumbnail && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Thumbnail saat ini:</p>
              <img
                src={getImageUrl(series.thumbnail, "series")}
                alt="Current thumbnail"
                className="w-32 h-20 object-cover rounded border"
              />
            </div>
          )}
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            Format yang didukung: JPG, PNG (maksimal 5MB). Biarkan kosong jika tidak ingin mengubah thumbnail.
          </p>
        </div>

        <div>
          <label htmlFor="orderIndex" className="block text-sm font-medium text-gray-700 mb-2">
            Urutan dalam Kategori
          </label>
          <input
            type="number"
            id="orderIndex"
            name="orderIndex"
            min="0"
            defaultValue={series?.orderIndex || 0}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="mt-1 text-sm text-gray-500">
            Angka lebih kecil akan ditampilkan lebih dulu
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Informasi Saat Ini:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Kategori:</strong> {series?.category?.name}</p>
            <p><strong>Slug:</strong> {series?.slug}</p>
            <p><strong>Total Materi:</strong> {series?.materials?.length || 0} video</p>
            <p><strong>Status:</strong> {series?.isActive ? 'Aktif' : 'Nonaktif'}</p>
            <p><strong>Dibuat:</strong> {new Date(series?.createdAt).toLocaleDateString('id-ID')}</p>
            <p><strong>Terakhir diupdate:</strong> {new Date(series?.updatedAt).toLocaleDateString('id-ID')}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <UpdateButton />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.back()}
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSeriesForm;
