import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaterialById } from "@/lib/data";
import { YouTubePlayer } from "@/components/dashboard/YouTubePlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPDFUrl } from "@/lib/supabase";

const page = async ({ params }) => {
  const material = await getMaterialById(params.id);

  if (!material) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/dashboard/categories" className="text-gray-700 hover:text-blue-600">
                Kategori
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link href={`/dashboard/categories/${material.series.category.id}`} className="text-gray-700 hover:text-blue-600">
                {material.series.category.name}
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link href={`/dashboard/series/${material.series.id}`} className="text-gray-700 hover:text-blue-600">
                {material.series.title}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500">{material.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{material.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <Link href={`/dashboard/categories/${material.series.category.id}`}>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
                {material.series.category.name}
              </Badge>
            </Link>
            <Link href={`/dashboard/series/${material.series.id}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-200">
                {material.series.title}
              </Badge>
            </Link>
            <span className="text-gray-500">{material.duration} menit</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/series/${material.series.id}`}>
            <Button variant="outline">Kembali ke Series</Button>
          </Link>
          <Link href="/dashboard/materials">
            <Button>Lihat Semua Materi</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          {material.youtube_url && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Pembelajaran</h2>
              <YouTubePlayer url={material.youtube_url} title={material.title} />
            </div>
          )}

          {/* Description */}
          {material.description && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Deskripsi Materi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{material.description}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Material Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informasi Materi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Kategori</label>
                <Link href={`/dashboard/categories/${material.series.category.id}`}>
                  <p className="text-blue-600 hover:text-blue-800 cursor-pointer">{material.series.category.name}</p>
                </Link>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Series</label>
                <Link href={`/dashboard/series/${material.series.id}`}>
                  <p className="text-blue-600 hover:text-blue-800 cursor-pointer">{material.series.title}</p>
                </Link>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Level</label>
                <p className="text-gray-900">{material.series.level}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Durasi</label>
                <p className="text-gray-900">{material.duration} menit</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Tanggal Dibuat</label>
                <p className="text-gray-900">
                  {new Date(material.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Terakhir Diupdate</label>
                <p className="text-gray-900">
                  {new Date(material.updatedAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Sumber Daya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {material.youtube_url && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Video YouTube</label>
                  <a href={material.youtube_url} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">
                    <Button variant="outline" size="sm" className="w-full">
                      Buka di YouTube
                    </Button>
                  </a>
                </div>
              )}

              {material.pdf_url && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Dokumen PDF</label>
                  <Link href={getPDFUrl(material.pdf_url, "materials")} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">
                    <Button variant="outline" size="sm" className="w-full">
                      Download PDF
                    </Button>
                  </Link>
                </div>
              )}

              {!material.youtube_url && !material.pdf_url && <p className="text-gray-500 text-sm">Tidak ada sumber daya tambahan untuk materi ini.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
