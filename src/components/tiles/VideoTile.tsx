"use client";

import { Play } from "lucide-react";

interface VideoTileProps {
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  imageUrl?: string | null;
}

export default function VideoTile({ title, description, videoUrl, imageUrl }: VideoTileProps) {
  function handleClick() {
    if (videoUrl) window.open(videoUrl, "_blank");
  }

  return (
    <div
      className="h-full relative overflow-hidden rounded-2xl cursor-pointer group"
      onClick={handleClick}
    >
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="h-6 w-6 text-white ml-1" />
        </div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end p-5">
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-white/70 mt-1 line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
}
