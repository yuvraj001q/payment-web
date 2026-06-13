"use client";

import { ExternalLink } from "lucide-react";

interface ImageTileProps {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  url?: string | null;
}

export default function ImageTile({ title, description, imageUrl, url }: ImageTileProps) {
  return (
    <div
      className="h-full relative overflow-hidden rounded-2xl cursor-pointer group"
      onClick={() => url && window.open(url, "_blank")}
    >
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end p-5">
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-white/70 mt-1 line-clamp-2">{description}</p>
        )}
      </div>
      {url && (
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ExternalLink className="h-4 w-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
