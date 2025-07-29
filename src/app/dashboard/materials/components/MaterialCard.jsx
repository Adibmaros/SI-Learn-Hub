import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/supabase";
import { Play, FileText, Clock, Eye, ChevronRight } from "lucide-react";

export function MaterialCard({ material }) {
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(material.youtube_url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  // Determine material type and styling
  const materialType = material.youtube_url ? 'video' : material.pdf_url ? 'pdf' : 'text';
  const typeConfig = {
    video: {
      icon: Play,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      label: 'Video'
    },
    pdf: {
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      label: 'PDF'
    },
    text: {
      icon: FileText,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      label: 'Artikel'
    }
  };

  const config = typeConfig[materialType];
  const Icon = config.icon;

  return (
    <Link href={`/dashboard/materials/${material.id}`}>
      <Card className="group h-full bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden">
        {/* Thumbnail or Placeholder */}
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {thumbnailUrl ? (
            <>
              <img 
                src={thumbnailUrl} 
                alt={material.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Play button overlay for videos */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="w-5 h-5 sm:w-7 sm:h-7 text-red-600 ml-1" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 ${config.bgColor} rounded-2xl flex items-center justify-center shadow-sm`}>
                <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${config.color}`} />
              </div>
            </div>
          )}
          
          {/* Type badge */}
          <div className={`absolute top-2 left-2 ${config.bgColor} ${config.borderColor} border px-2 py-1 rounded-full`}>
            <div className="flex items-center gap-1">
              <Icon className={`w-3 h-3 ${config.color}`} />
              <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm sm:text-base lg:text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 flex-1">
              {material.title}
            </CardTitle>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
            {material.description || "Materi pembelajaran komprehensif yang dirancang untuk meningkatkan pemahaman dan keterampilan Anda dalam topik ini."}
          </p>

          {/* Tags and Category */}
          <div className="space-y-3">
            {/* Series badge */}
            {material.series?.name && (
              <div className="flex items-center gap-2">
               <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 rounded-full border-0 font-medium text-xs min-w-0 break-all">
  📚 {material.series.name}
</Badge>
              </div>
            )}

            {/* Category and progress */}
            <div className="flex items-center justify-between">
              {material.series?.category?.name && (
                <span className="text-xs sm:text-sm text-green-600 font-medium">
                  🎯 {material.series.category.name}
                </span>
              )}
              
            </div>

          </div>
        </CardContent>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl sm:rounded-2xl"></div>
      </Card>
    </Link>
  );
}