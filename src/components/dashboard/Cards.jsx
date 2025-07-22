import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/supabase";

export function CategoryCard({ category }) {
  const totalMaterials = category.series?.reduce((total, series) => total + (series.materials?.length || 0), 0) || 0;
  
  return (
    <Link href={`/dashboard/categories/${category.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer h-full border-l-4 border-l-blue-500 hover:scale-[1.02]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {category.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {category.description || "Tidak ada deskripsi"}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs font-medium">
              {category.series?.length || 0} Series
            </Badge>
            <Badge variant="outline" className="text-xs">
              {totalMaterials} Materi
            </Badge>
          </div>
          <div className="text-xs text-gray-500">
            Dibuat: {new Date(category.createdAt).toLocaleDateString('id-ID')}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function SeriesCard({ series }) {
  return (
    <Link href={`/dashboard/series/${series.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img 
            src={getImageUrl(series.thumbnail, "series")} 
            alt={series.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2">{series.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 mb-3 text-sm sm:text-base line-clamp-2">
            {series.description || "Tidak ada deskripsi"}
          </p>
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                {series.level}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {series.materials?.length || 0} Materi
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-blue-600 font-medium truncate mr-2">
                {series.category?.name}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function MaterialCard({ material }) {
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(material.youtube_url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  return (
    <Link href={`/dashboard/materials/${material.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        {thumbnailUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img 
              src={thumbnailUrl} 
              alt={material.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2">{material.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 mb-3 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
            {material.description || "Tidak ada deskripsi"}
          </p>
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-xs truncate max-w-[120px] sm:max-w-none">
                {material.series?.name}
              </Badge>
            </div>
            <div className="text-right">
              <span className="text-xs sm:text-sm text-blue-600 font-medium">
                {material.series?.category?.name}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}