"use client";

import { Button } from "@/components/ui/button";
import React, { useActionState, useEffect } from "react";
import { addMaterialAction } from "../libs/action";
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
      {pending ? "Loading..." : "Tambah Materi"}
    </Button>
  );
};

const CreateMaterialForm = ({ series }) => {
  const router = useRouter();
  const [state, formAction] = useActionState(addMaterialAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push(state.redirectUrl);
    }
  }, [state.success, state.redirectUrl, router]);

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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Materi</h1>

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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Judul Materi *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Contoh: Pengenalan React.js - Part 1"
          />
        </div>

        <div>
          <label htmlFor="seriesId" className="block text-sm font-medium text-gray-700 mb-2">
            Series *
          </label>
          <select
            id="seriesId"
            name="seriesId"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Pilih Series</option>
            {Object.entries(seriesByCategory).map(([categoryName, categorySeries]) => (
              <optgroup key={categoryName} label={categoryName}>
                {categorySeries.map((serie) => (
                  <option key={serie.id} value={serie.id}>
                    {serie.name} ({serie.level})
                  </option>
                ))}
              </optgroup>
            ))}
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
            placeholder="Jelaskan detail materi ini"
          />
        </div>

        <div>
          <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-700 mb-2">
            URL YouTube
          </label>
          <input
            type="url"
            id="youtube_url"
            name="youtube_url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <p className="mt-1 text-sm text-gray-500">
            Masukkan link video YouTube untuk materi ini
          </p>
        </div>

        <div>
          <label htmlFor="pdf_file" className="block text-sm font-medium text-gray-700 mb-2">
            File PDF
          </label>
          <input
            type="file"
            id="pdf_file"
            name="pdf_file"
            accept=".pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            Upload file PDF untuk materi ini (maksimal 10MB)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Durasi (detik)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="3600"
            />
            <p className="mt-1 text-sm text-gray-500">
              Durasi video dalam detik (opsional)
            </p>
          </div>

          <div>
            <label htmlFor="orderIndex" className="block text-sm font-medium text-gray-700 mb-2">
              Urutan dalam Series
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
              Angka lebih kecil ditampilkan lebih dulu
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-sm text-yellow-800">
            <strong>Catatan:</strong> Setidaknya satu dari URL YouTube atau File PDF harus diisi.
          </p>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default CreateMaterialForm;
