"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppTileProps {
  title: string;
  description?: string | null;
  phone?: string | null;
  message?: string | null;
  ctaText?: string | null;
}

export default function WhatsAppTile({
  title,
  description,
  phone,
  message,
  ctaText,
}: WhatsAppTileProps) {
  function handleClick() {
    if (!phone) return;
    const encoded = encodeURIComponent(message || "Hi, I saw your page and want to know more!");
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, "_blank");
  }

  return (
    <div
      className="h-full flex flex-col justify-between p-5 cursor-pointer group"
      onClick={handleClick}
    >
      <div>
        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
          <MessageCircle className="h-5 w-5 text-green-400" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        )}
      </div>
      <div className="mt-3">
        <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 group-hover:bg-green-500/30 transition-colors">
          {ctaText || "Chat on WhatsApp"}
        </span>
      </div>
    </div>
  );
}
