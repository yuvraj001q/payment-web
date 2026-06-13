"use client";

import { ExternalLink } from "lucide-react";

interface LinkTileProps {
  title: string;
  description?: string | null;
  url?: string | null;
  ctaText?: string | null;
}

export default function LinkTile({ title, description, url, ctaText }: LinkTileProps) {
  return (
    <div className="h-full flex flex-col justify-between p-5">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        )}
      </div>
      <div className="flex items-center justify-between mt-3">
        {ctaText && (
          <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            {ctaText}
          </span>
        )}
        {url && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
      </div>
    </div>
  );
}
