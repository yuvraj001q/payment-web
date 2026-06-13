"use client";

import { Calendar } from "lucide-react";

interface BookingTileProps {
  title: string;
  description?: string | null;
  url?: string | null;
  ctaText?: string | null;
}

export default function BookingTile({ title, description, url, ctaText }: BookingTileProps) {
  return (
    <div
      className="h-full flex flex-col justify-between p-5 cursor-pointer group"
      onClick={() => url && window.open(url, "_blank")}
    >
      <div>
        <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center mb-3">
          <Calendar className="h-5 w-5 text-teal-400" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        )}
      </div>
      <div className="mt-3">
        <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-400 group-hover:bg-teal-500/30 transition-colors">
          {ctaText || "Book Now"}
        </span>
      </div>
    </div>
  );
}
