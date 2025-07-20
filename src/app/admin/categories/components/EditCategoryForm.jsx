'use client';

import React from "react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { updateCategory } from "../libs/action";
import { useRouter } from "next/navigation";

const initialState = {
    message: "",
    success: false,
}

const UpdateButton = () => {
    const { pending } = useFormStatus();
    return (
        <button
        type="submit"
        disabled={pending}
        className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
        {pending ? "Updating..." : "Update"}
        </button>
    );
}

const EditCategoryForm = ({ category }) => {

    const router = useRouter();

    const updateById = (_, formData) => updateCategory(_, formData, category?.id);

    const [state, formAction] = useActionState(updateById, initialState);

    useEffect(() => {
        if (state.success && state.redirectUrl) {
            router.push(state.redirectUrl);
        }
    }, [state, router]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 sm:p-8">
        {state.message && (
          <div className={`mb-4 p-4 ${state.success ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"} rounded-lg`}>
            {state.message}
          </div>
        )}
        <form action={formAction} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Kategori <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={category?.name || ""}
              placeholder="Masukkan nama kategori"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={category?.description || ""}
              placeholder="Masukkan deskripsi kategori (opsional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
            />
            <p className="text-sm text-gray-500 mt-1">Deskripsi singkat tentang kategori ini untuk membantu pengguna memahami konten</p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <UpdateButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;