"use client";

interface SocialTileProps {
  title: string;
  description?: string | null;
  metadata?: {
    socialLinks?: { platform: string; url: string }[];
  } | null;
}

const socialIcons: Record<string, string> = {
  instagram: "📷",
  twitter: "🐦",
  facebook: "👤",
  tiktok: "🎵",
  youtube: "▶️",
  linkedin: "💼",
  pinterest: "📌",
};

export default function SocialTile({ title, description, metadata }: SocialTileProps) {
  const links = metadata?.socialLinks || [];

  return (
    <div className="h-full flex flex-col justify-between p-5">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        )}
      </div>
      {links.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-xs font-medium flex items-center gap-1.5"
            >
              <span>{socialIcons[link.platform.toLowerCase()] || "🔗"}</span>
              {link.platform}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
