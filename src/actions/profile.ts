"use server";

import { z } from "zod";
import { auth } from "@/config/auth";
import { updateProfile, slugExists, getProfileByUserId } from "@/db/queries";
import { redirect } from "next/navigation";

const profileSchema = z.object({
  businessName: z.string().min(2).max(255),
  slug: z.string().min(2).max(255).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  category: z.string(),
  logoUrl: z.string().url().optional().or(z.literal("")),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  phone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  theme: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  tileRadius: z.number(),
  gridGap: z.number(),
  fontFamily: z.string(),
});

export async function updateProfileAction(data: Record<string, any>) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  try {
    const validated = profileSchema.parse(data);

    const existing = await getProfileByUserId((session.user as any).id);
    if (!existing) return { error: "Profile not found" };

    if (validated.slug !== existing.slug) {
      const slugAvailable = await slugExists(validated.slug);
      if (slugAvailable) return { error: "Slug is already taken" };
    }

    await updateProfile((session.user as any).id, {
      ...validated,
      logoUrl: validated.logoUrl || null,
      coverImageUrl: validated.coverImageUrl || null,
      website: validated.website || null,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Failed to update profile" };
  }
}
