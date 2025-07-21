import React from "react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Logo or Brand */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>

        {/* Animated Spinner */}
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Memuat SI Learn Hub</h2>
        <p className="text-gray-600">Mohon tunggu sebentar...</p>

        {/* Loading Bar */}
        <div className="w-64 mx-auto mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
