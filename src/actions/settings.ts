"use server";

import { auth } from "@/config/auth";
import { updateProfile } from "@/db/queries";
import { z } from "zod";

const settingsSchema = z.object({
  theme: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  tileRadius: z.number(),
  gridGap: z.number(),
  fontFamily: z.string(),
  customCss: z.string().optional(),
});

export async function updateSettingsAction(data: Record<string, any>) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  try {
    const validated = settingsSchema.parse(data);
    await updateProfile((session.user as any).id, validated);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Failed to update settings" };
  }
}
