"use client";

import { Button } from "@/components/ui/button";
import React, { useActionState, useEffect } from "react";
import { addSeriesAction } from "../libs/action";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
  success: false,
  redirectUrl: "",
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Loading..." : "Tambah Series"}
    </Button>
  );
};

const CreateSeriesForm = ({ categories }) => {
  const router = useRouter();
  const [state, formAction] = useActionState(addSeriesAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push(state.redirectUrl);
    }
  }, [state.success, state.redirectUrl, router]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Series</h1>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="Jelaskan detail series ini"
          />
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail Series
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            Format yang didukung: JPG, PNG (maksimal 5MB). Ukuran ideal: 1280x720px
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
            defaultValue="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
          <p className="mt-1 text-sm text-gray-500">
            Angka lebih kecil akan ditampilkan lebih dulu
          </p>
        </div>

        <div className="flex space-x-4">
          <SubmitButton />
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

export default CreateSeriesForm;
