export interface TileMetadata {
  stars?: number;
  reviewCount?: number;
  author?: string;
  bookingUrl?: string;
  bookingDate?: string;
  mapsUrl?: string;
  lat?: number;
  lng?: number;
  socialLinks?: { platform: string; url: string }[];
  galleryImages?: string[];
}

export type TileType =
  | "link"
  | "image"
  | "video"
  | "flash_offer"
  | "whatsapp"
  | "map"
  | "social"
  | "gallery"
  | "review"
  | "booking";

export type TileSize = {
  width: number;
  height: number;
};

export const TILE_SIZES: Record<string, TileSize> = {
  "1x1": { width: 1, height: 1 },
  "2x1": { width: 2, height: 1 },
  "1x2": { width: 1, height: 2 },
  "2x2": { width: 2, height: 2 },
  "3x2": { width: 3, height: 2 },
  "4x2": { width: 4, height: 2 },
};

export type ThemePreset = "dark" | "light" | "midnight" | "neon" | "elegant";

export interface ProfileWithTiles {
  id: string;
  userId: string;
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
  isVerified: boolean;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  tileRadius: number;
  gridGap: number;
  fontFamily: string;
  customCss: string | null;
  createdAt: Date;
  updatedAt: Date;
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
    metadata: TileMetadata | null;
  }>;
}

export interface DashboardStats {
  totalViews: number;
  totalClicks: number;
  totalQrScans: number;
  totalUniqueVisitors: number;
  viewsChange: number;
  clicksChange: number;
}
