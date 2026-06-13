"use client";

import { MapPin, Navigation } from "lucide-react";

interface MapTileProps {
  title: string;
  description?: string | null;
  address?: string | null;
  metadata?: {
    lat?: number;
    lng?: number;
    mapsUrl?: string;
  } | null;
}

export default function MapTile({ title, description, address, metadata }: MapTileProps) {
  function openMaps() {
    if (metadata?.mapsUrl) {
      window.open(metadata.mapsUrl, "_blank");
    } else if (address) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
        "_blank"
      );
    }
  }

  return (
    <div className="h-full flex flex-col justify-between p-5 cursor-pointer group" onClick={openMaps}>
      <div>
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
          <MapPin className="h-5 w-5 text-indigo-400" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {address && (
          <p className="text-sm text-muted-foreground mt-1">{address}</p>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Navigation className="h-4 w-4 text-indigo-400" />
        <span className="text-xs font-medium text-indigo-400">Get Directions</span>
      </div>
    </div>
  );
}
