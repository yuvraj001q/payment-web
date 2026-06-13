"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface BentoGridProps {
  tiles: Array<{
    id: string;
    tileType: string;
    title: string;
    description: string | null;
    url: string | null;
    imageUrl: string | null;
    videoUrl: string | null;
    gridWidth: number;
    gridHeight: number;
    displayOrder: number;
    backgroundStyle: string | null;
    ctaText: string | null;
    whatsappMessage: string | null;
    countdownEnd: Date | null;
    isActive: boolean;
    metadata: any;
  }>;
  profile: {
    tileRadius: number;
    gridGap: number;
    primaryColor: string;
    secondaryColor: string;
  };
  onTileClick?: (tileId: string) => void;
}

export default function BentoGrid({ tiles, profile, onTileClick }: BentoGridProps) {
  const activeTiles = tiles.filter((t) => t.isActive).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "180px",
        gap: `${profile.gridGap}px`,
      }}
    >
      {activeTiles.map((tile, index) => (
        <BentoTile
          key={tile.id}
          tile={tile}
          profile={profile}
          index={index}
          onClick={() => onTileClick?.(tile.id)}
        />
      ))}
    </div>
  );
}

function BentoTile({
  tile,
  profile,
  index,
  onClick,
}: {
  tile: BentoGridProps["tiles"][0];
  profile: BentoGridProps["profile"];
  index: number;
  onClick: () => void;
}) {
  const colSpan = tile.gridWidth;
  const rowSpan = tile.gridHeight;

  const gradientMap: Record<string, string> = {
    link: `linear-gradient(135deg, ${profile.primaryColor}22, ${profile.secondaryColor}22)`,
    image: `linear-gradient(135deg, #ec489922, #f43f5e22)`,
    video: `linear-gradient(135deg, #ef444422, #f9731622)`,
    flash_offer: `linear-gradient(135deg, #f59e0b22, #eab30822)`,
    whatsapp: `linear-gradient(135deg, #22c55e22, #10b98122)`,
    map: `linear-gradient(135deg, #6366f122, #8b5cf622)`,
    review: `linear-gradient(135deg, #ec489922, #f43f5e22)`,
    booking: `linear-gradient(135deg, #14b8a622, #06b6d422)`,
    social: `linear-gradient(135deg, #8b5cf622, #a855f722)`,
    gallery: `linear-gradient(135deg, #3b82f622, #60a5fa22)`,
  };

  const bgStyle = tile.backgroundStyle === "gradient"
    ? gradientMap[tile.tileType] || gradientMap.link
    : tile.backgroundStyle === "solid"
    ? `${profile.primaryColor}15`
    : tile.backgroundStyle === "outline"
    ? "transparent"
    : "rgba(255,255,255,0.03)";

  const borderStyle = tile.backgroundStyle === "outline"
    ? `1px solid ${profile.primaryColor}40`
    : "1px solid rgba(255,255,255,0.08)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer group backdrop-blur-xl transition-all"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        borderRadius: `${profile.tileRadius}px`,
        background: bgStyle,
        border: borderStyle,
      }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />

      {/* Content */}
      <div className="relative h-full p-5 flex flex-col justify-between z-10">
        <div className="flex-1">
          {tile.imageUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
              style={{ backgroundImage: `url(${tile.imageUrl})` }}
            />
          )}
          <div className="relative z-10">
            <h3 className="font-semibold text-lg leading-tight">{tile.title}</h3>
            {tile.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {tile.description}
              </p>
            )}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-3">
          {tile.ctaText && (
            <span
              className="text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm"
              style={{
                backgroundColor: `${profile.primaryColor}20`,
                color: profile.primaryColor,
              }}
            >
              {tile.ctaText}
            </span>
          )}
          {tile.url && (
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>

      {/* Type indicator */}
      <div
        className="absolute top-3 right-3 w-2 h-2 rounded-full"
        style={{ backgroundColor: profile.primaryColor }}
      />
    </motion.div>
  );
}
