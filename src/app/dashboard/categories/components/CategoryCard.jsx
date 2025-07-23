import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Play, FileText, Clock, Star } from "lucide-react";

export function CategoryCard({ category }) {
  const totalMaterials = category.series?.reduce((total, series) => total + (series.materials?.length || 0), 0) || 0;
  const totalSeries = category.series?.length || 0;
  
  // Generate gradient colors based on category name
  const gradients = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-600",
    "from-indigo-500 to-blue-600",
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-green-600"
  ];
  
  const gradientIndex = category.name ? category.name.length % gradients.length : 0;
  const selectedGradient = gradients[gradientIndex];

  return (
    <Link href={`/dashboard/categories/${category.id}`}>
      <Card className="group h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden">
        {/* Top gradient bar with pattern */}
        <div className={`h-2 bg-gradient-to-r ${selectedGradient} relative`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        <CardHeader className="pb-4">
          {/* Category icon and title */}
          <div className="flex items-start justify-between mb-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${selectedGradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <FileText className="w-6 h-6 text-white" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
          
          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {category.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Description */}
          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
            {category.description || "Eksplorasi materi pembelajaran komprehensif yang dirancang untuk meningkatkan pemahaman dan keterampilan Anda."}
          </p>

          {/* Stats badges */}
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-full border-0 font-medium">
              <Play className="w-3 h-3 mr-1" />
              {totalSeries} Series
            </Badge>
            <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-full border-0 font-medium">
              <FileText className="w-3 h-3 mr-1" />
              {totalMaterials} Materi
            </Badge>
          </div>

          {/* Progress indicator (placeholder) */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Progress</span>
              <span className="text-xs text-gray-400">0%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-0 transition-all duration-500"></div>
            </div>
          </div>

          {/* Action button */}
          <div className={`w-full bg-gradient-to-r ${selectedGradient} text-white py-3 px-4 rounded-xl text-center font-medium text-sm group-hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}>
            <span>Mulai Belajar</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </CardContent>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
      </Card>
    </Link>
  );
}