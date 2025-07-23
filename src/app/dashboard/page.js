import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DashboardPage = () => {
  const features = [
    {
      icon: "📚",
      title: "Kategori Pembelajaran",
      description: "Jelajahi berbagai kategori pembelajaran Sistem Informasi yang terstruktur",
      link: "/dashboard/categories",
    },
    {
      icon: "📖",
      title: "Materi Pembelajaran",
      description: "Akses materi pembelajaran lengkap dari berbagai topik",
      link: "/dashboard/materials",
    },
  ];

  const stats = [
    { label: "Kategori", value: "15+", icon: "📂" },
    { label: "Series", value: "50+", icon: "📊" },
    { label: "Materi", value: "200+", icon: "📄" },
    { label: "Pengguna", value: "1000+", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Platform Pembelajaran Sistem Informasi
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Selamat Datang di <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SI Learn Hub</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Platform pembelajaran terpadu untuk mengembangkan kemampuan Sistem Informasi Anda. Akses materi berkualitas, ikuti series pembelajaran terstruktur, dan kembangkan skill IT Anda.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard/categories">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🚀 Mulai Belajar Sekarang
              </Button>
            </Link>
            <Link href="/dashboard/materials">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300">
                📚 Jelajahi Materi
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Fitur Unggulan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Temukan berbagai fitur yang membantu perjalanan pembelajaran Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-0 bg-white/80 backdrop-blur-sm hover:scale-[1.02]">
                  <CardContent className="p-6 lg:p-8 space-y-4">
                    <div className="text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Mulai Sekarang
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Siap Untuk Memulai Perjalanan Belajar Anda?</h3>
              <p className="text-lg lg:text-xl mb-8 opacity-90">Bergabunglah dengan ribuan pelajar lainnya dan kembangkan skill IT Anda bersama SI Learn Hub</p>
              <Link href="/dashboard/categories">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                  🎯 Mulai Pembelajaran
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
