"use client";

import { motion } from "framer-motion";
import {
  Link,
  Image,
  Video,
  Zap,
  MessageCircle,
  MapPin,
  Star,
  Calendar,
  GalleryHorizontal,
} from "lucide-react";
import type { Tile } from "@/db/schema";

const tileTypeIcons: Record<string, any> = {
  link: Link,
  image: Image,
  video: Video,
  flash_offer: Zap,
  whatsapp: MessageCircle,
  map: MapPin,
  review: Star,
  booking: Calendar,
  gallery: GalleryHorizontal,
};

const tileTypeColors: Record<string, string> = {
  link: "from-blue-500 to-cyan-500",
  image: "from-purple-500 to-pink-500",
  video: "from-red-500 to-orange-500",
  flash_offer: "from-amber-500 to-yellow-500",
  whatsapp: "from-green-500 to-emerald-500",
  map: "from-indigo-500 to-violet-500",
  review: "from-pink-500 to-rose-500",
  booking: "from-teal-500 to-cyan-500",
  gallery: "from-blue-500 to-indigo-500",
  social: "from-violet-500 to-purple-500",
};

export default function TileRenderer({ tile }: { tile: Tile }) {
  const Icon = tileTypeIcons[tile.tileType] || Link;
  const colorClass = tileTypeColors[tile.tileType] || tileTypeColors.link;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative glass-card overflow-hidden group cursor-pointer h-full"
      onClick={() => tile.url && window.open(tile.url, "_blank")}
    >
      {tile.imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ backgroundImage: `url(${tile.imageUrl})` }}
        />
      )}

      <div className="relative z-10 h-full p-4 flex flex-col justify-between">
        <div>
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-3 opacity-80`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-semibold">{tile.title}</h3>
          {tile.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {tile.description}
            </p>
          )}
        </div>

        {tile.ctaText && (
          <div className="mt-3">
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              {tile.ctaText}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
