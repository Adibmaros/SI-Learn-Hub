// app/not-found.js
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Halaman yang Anda cari tidak ditemukan.</p>
      <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Kembali ke Beranda
      </a>
    </div>
  );
}
