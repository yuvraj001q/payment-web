"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import LinkTile from "@/components/tiles/LinkTile";
import ImageTile from "@/components/tiles/ImageTile";
import VideoTile from "@/components/tiles/VideoTile";
import FlashOfferTile from "@/components/tiles/FlashOfferTile";
import WhatsAppTile from "@/components/tiles/WhatsAppTile";
import MapTile from "@/components/tiles/MapTile";
import ReviewTile from "@/components/tiles/ReviewTile";
import BookingTile from "@/components/tiles/BookingTile";
import SocialTile from "@/components/tiles/SocialTile";
import GalleryTile from "@/components/tiles/GalleryTile";
import { getInitials } from "@/lib/utils";

interface TileData {
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
}

interface ProfileData {
  businessName: string;
  slug: string;
  description: string | null;
  category: string;
  logoUrl: string | null;
  coverImageUrl: string | null;
  phone: string | null;
  whatsappNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  website: string | null;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  tileRadius: number;
  gridGap: number;
  fontFamily: string;
  customCss: string | null;
}

export default function PublicProfile({
  profile,
  tiles,
}: {
  profile: ProfileData;
  tiles: TileData[];
}) {
  const activeTiles = tiles
    .filter((t) => t.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const trackClick = useCallback(
    async (tileId: string) => {
      try {
        await fetch("/[slug]/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: profile.slug,
            tileId,
            device: navigator.userAgent,
            referrer: document.referrer,
          }),
        });
      } catch {}
    },
    [profile.slug]
  );

  function renderTile(tile: TileData) {
    const commonProps = {
      title: tile.title,
      description: tile.description,
    };

    switch (tile.tileType) {
      case "link":
        return (
          <LinkTile
            {...commonProps}
            url={tile.url}
            ctaText={tile.ctaText}
          />
        );
      case "image":
        return (
          <ImageTile
            {...commonProps}
            imageUrl={tile.imageUrl}
            url={tile.url}
          />
        );
      case "video":
        return (
          <VideoTile
            {...commonProps}
            videoUrl={tile.videoUrl}
            imageUrl={tile.imageUrl}
          />
        );
      case "flash_offer":
        return (
          <FlashOfferTile
            {...commonProps}
            countdownEnd={tile.countdownEnd}
          />
        );
      case "whatsapp":
        return (
          <WhatsAppTile
            {...commonProps}
            phone={profile.whatsappNumber}
            message={tile.whatsappMessage}
            ctaText={tile.ctaText}
          />
        );
      case "map":
        return (
          <MapTile
            {...commonProps}
            address={profile.address}
            metadata={tile.metadata}
          />
        );
      case "review":
        return (
          <ReviewTile
            {...commonProps}
            metadata={tile.metadata}
          />
        );
      case "booking":
        return (
          <BookingTile
            {...commonProps}
            url={tile.url}
            ctaText={tile.ctaText}
          />
        );
      case "social":
        return (
          <SocialTile
            {...commonProps}
            metadata={tile.metadata}
          />
        );
      case "gallery":
        return (
          <GalleryTile
            {...commonProps}
            imageUrl={tile.imageUrl}
            metadata={tile.metadata}
          />
        );
      default:
        return <LinkTile {...commonProps} url={tile.url} />;
    }
  }

  return (
    <>
      {profile.customCss && (
        <style dangerouslySetInnerHTML={{ __html: profile.customCss }} />
      )}

      <div
        className="min-h-screen relative"
        style={{
          fontFamily: profile.fontFamily,
          background: profile.theme === "light" ? "#f8fafc" : "#0a0a0f",
          color: profile.theme === "light" ? "#0f172a" : "#ffffff",
        }}
      >
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-20"
            style={{
              background: `linear-gradient(135deg, ${profile.primaryColor}, ${profile.secondaryColor})`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
          {/* Cover Image */}
          {profile.coverImageUrl && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-48 rounded-2xl bg-cover bg-center mb-8 border border-white/10"
              style={{ backgroundImage: `url(${profile.coverImageUrl})` }}
            />
          )}

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            {profile.logoUrl ? (
              <div className="w-20 h-20 rounded-2xl bg-cover bg-center mx-auto mb-4 border border-white/20 shadow-lg"
                style={{ backgroundImage: `url(${profile.logoUrl})` }}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg text-2xl font-bold"
                style={{
                  background: `linear-gradient(135deg, ${profile.primaryColor}, ${profile.secondaryColor})`,
                }}
              >
                {getInitials(profile.businessName)}
              </div>
            )}

            <h1 className="text-3xl font-bold">{profile.businessName}</h1>

            {profile.description && (
              <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                {profile.description}
              </p>
            )}

            {(profile.city || profile.state || profile.country) && (
              <p className="text-sm text-muted-foreground mt-2">
                {[profile.city, profile.state, profile.country].filter(Boolean).join(", ")}
              </p>
            )}
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative overflow-hidden cursor-pointer group backdrop-blur-xl"
                  style={{
                    gridColumn: `span ${tile.gridWidth}`,
                    gridRow: `span ${tile.gridHeight}`,
                    borderRadius: `${profile.tileRadius}px`,
                    background:
                      tile.backgroundStyle === "gradient"
                        ? `linear-gradient(135deg, ${profile.primaryColor}15, ${profile.secondaryColor}15)`
                        : tile.backgroundStyle === "solid"
                        ? `${profile.primaryColor}10`
                        : "rgba(255,255,255,0.03)",
                    border:
                      tile.backgroundStyle === "outline"
                        ? `1px solid ${profile.primaryColor}30`
                        : "1px solid rgba(255,255,255,0.08)",
                  }}
                  onClick={() => trackClick(tile.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" />

                  {renderTile(tile)}
                </motion.div>
              ))}
            </div>

            {activeTiles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">This page is under construction.</p>
              </div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 pb-8"
          >
            <p className="text-xs text-muted-foreground">
              Powered by{" "}
              <a href="/" className="underline hover:text-foreground transition-colors">
                Predator Grid
              </a>
            </p>
          </motion.div>
        </div>

        {/* Responsive Grid */}
        <style>{`
          @media (max-width: 768px) {
            div[style*="grid-template-columns: repeat(4"] {
              grid-template-columns: 1fr !important;
              grid-auto-rows: auto !important;
            }
            div[style*="grid-column: span"] {
              grid-column: span 1 !important;
              min-height: 140px;
            }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            div[style*="grid-template-columns: repeat(4"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
