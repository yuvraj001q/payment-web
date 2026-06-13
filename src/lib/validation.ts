import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const profileSchema = z.object({
  businessName: z.string().min(2).max(255),
  slug: z
    .string()
    .min(2)
    .max(255)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().max(500).optional(),
  category: z.enum([
    "restaurant",
    "cafe",
    "hotel",
    "salon",
    "gym",
    "retail",
    "creator",
    "services",
    "general",
  ]),
  logoUrl: z.string().url().optional().or(z.literal("")),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  phone: z.string().max(50).optional(),
  whatsappNumber: z.string().max(50).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  website: z.string().url().optional().or(z.literal("")),
});

export const tileSchema = z.object({
  tileType: z.enum([
    "link",
    "image",
    "video",
    "flash_offer",
    "whatsapp",
    "map",
    "social",
    "gallery",
    "review",
    "booking",
  ]),
  title: z.string().min(1).max(255),
  description: z.string().max(500).optional(),
  url: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  gridWidth: z.number().min(1).max(4),
  gridHeight: z.number().min(1).max(2),
  ctaText: z.string().max(100).optional(),
  whatsappMessage: z.string().max(500).optional(),
  countdownEnd: z.string().optional(),
  backgroundStyle: z.enum(["glass", "gradient", "solid", "outline"]).optional(),
});

export const settingsSchema = z.object({
  theme: z.enum(["dark", "light", "midnight", "neon", "elegant"]),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  tileRadius: z.number().min(0).max(32),
  gridGap: z.number().min(0).max(32),
  fontFamily: z.string(),
  customCss: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type TileInput = z.infer<typeof tileSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
