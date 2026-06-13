"use client";

import { ExternalLink } from "lucide-react";

interface GalleryTileProps {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  metadata?: {
    galleryImages?: string[];
  } | null;
}

export default function GalleryTile({ title, description, imageUrl, metadata }: GalleryTileProps) {
  const images = metadata?.galleryImages || [];
  const displayImages = imageUrl ? [imageUrl, ...images] : images;

  return (
    <div className="h-full flex flex-col justify-between p-5">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        )}
      </div>
      {displayImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {displayImages.slice(0, 6).map((img, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-cover bg-center border border-white/10"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
