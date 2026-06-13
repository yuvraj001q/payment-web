"use server";

import { z } from "zod";
import { auth } from "@/config/auth";
import { createTile, updateTile, deleteTile, reorderTiles, getProfileByUserId } from "@/db/queries";

const tileSchema = z.object({
  tileType: z.string(),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  gridWidth: z.number().min(1).max(4),
  gridHeight: z.number().min(1).max(2),
  ctaText: z.string().optional(),
  whatsappMessage: z.string().optional(),
  backgroundStyle: z.string().optional(),
  countdownEnd: z.string().optional(),
  profileId: z.string().uuid(),
});

export async function createTileAction(data: Record<string, any>) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  try {
    const validated = tileSchema.parse(data);

    const profile = await getProfileByUserId((session.user as any).id);
    if (!profile) return { error: "Profile not found" };

    const tile = await createTile({
      ...validated,
      profileId: profile.id,
      imageUrl: validated.imageUrl || null,
      videoUrl: validated.videoUrl || null,
      url: validated.url || null,
      description: validated.description || null,
      ctaText: validated.ctaText || null,
      whatsappMessage: validated.whatsappMessage || null,
      backgroundStyle: validated.backgroundStyle || "glass",
      countdownEnd: validated.countdownEnd ? new Date(validated.countdownEnd) : null,
      displayOrder: 0,
    });

    return { tile };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Failed to create tile" };
  }
}

export async function updateTileAction(id: string, data: Record<string, any>) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  try {
    const tile = await updateTile(id, {
      ...data,
      countdownEnd: data.countdownEnd ? new Date(data.countdownEnd) : undefined,
    });

    return { tile };
  } catch {
    return { error: "Failed to update tile" };
  }
}

export async function deleteTileAction(id: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  try {
    await deleteTile(id);
    return { success: true };
  } catch {
    return { error: "Failed to delete tile" };
  }
}

export async function reorderTilesAction(tileIds: string[]) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  try {
    await reorderTiles(tileIds);
    return { success: true };
  } catch {
    return { error: "Failed to reorder tiles" };
  }
}
