"use client";

import { Star } from "lucide-react";

interface ReviewTileProps {
  title: string;
  description?: string | null;
  metadata?: {
    stars?: number;
    reviewCount?: number;
    author?: string;
  } | null;
}

export default function ReviewTile({ title, description, metadata }: ReviewTileProps) {
  const stars = metadata?.stars || 5;
  const reviewCount = metadata?.reviewCount || 0;

  return (
    <div className="h-full flex flex-col justify-between p-5">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{description}</p>
        )}
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < stars ? "text-amber-400 fill-amber-400" : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        {reviewCount > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            {reviewCount} review{reviewCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
