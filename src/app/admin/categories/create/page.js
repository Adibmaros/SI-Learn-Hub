"use client";

import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { createCategory } from "../libs/action";
import { useRouter } from "next/navigation";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

const initialState = {
  message: "",
  success: false,
};

const page = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(createCategory, initialState);

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">Tambah Kategori Materi</h1>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8">
          {state.message && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">{state.message}</div>}
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Kategori
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 required"
                placeholder="Masukkan nama kategori"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Kategori
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 resize-vertical"
                placeholder="Masukkan deskripsi kategori (opsional)"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end pt-4">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
