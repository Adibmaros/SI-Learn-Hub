import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CategoryCard({ category }) {
  const totalMaterials = category.series?.reduce((total, series) => total + (series.materials?.length || 0), 0) || 0;
  
  return (
    <Link href={`/dashboard/categories/${category.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg">{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-3">
            {category.description || "Tidak ada deskripsi"}
          </p>
          <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary">
              {category.series?.length || 0} Series
            </Badge>
            <Badge variant="outline">
              {totalMaterials} Materi
            </Badge>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">
              {new Date(category.createdAt).toLocaleDateString('id-ID')}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function SeriesCard({ series }) {
  return (
    <Link href={`/dashboard/series/${series.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg">{series.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-3">
            {series.description || "Tidak ada deskripsi"}
          </p>
          <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary">
              {series.level}
            </Badge>
            <Badge variant="outline">
              {series.materials?.length || 0} Materi
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-600 font-medium">
              {series.category?.name}
            </span>
            <span className="text-sm text-gray-500">
              {series.duration} menit
            </span>
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
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        {thumbnailUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img 
              src={thumbnailUrl} 
              alt={material.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-3 line-clamp-3">
            {material.description || "Tidak ada deskripsi"}
          </p>
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline">
              {material.series?.title}
            </Badge>
            <span className="text-sm text-gray-500">
              {material.duration} menit
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm text-blue-600 font-medium">
              {material.series?.category?.name}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
