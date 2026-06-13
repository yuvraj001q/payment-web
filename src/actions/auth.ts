"use server";

import { z } from "zod";
import { createUser, getUserByEmail, createProfile, slugExists } from "@/db/queries";
import { generateSlug } from "@/lib/utils";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function registerAction(data: { name: string; email: string; password: string }) {
  try {
    const validated = registerSchema.parse(data);

    const existing = await getUserByEmail(validated.email);
    if (existing) {
      return { error: "Email already in use" };
    }

    const bcrypt = await import("bcryptjs");
    const passwordHash = await bcrypt.hash(validated.password, 12);

    const user = await createUser({
      name: validated.name,
      email: validated.email,
      passwordHash,
      role: "user",
    });

    let slug = generateSlug(validated.name);
    let slugCounter = 0;
    while (await slugExists(slug)) {
      slugCounter++;
      slug = `${generateSlug(validated.name)}-${slugCounter}`;
    }

    await createProfile({
      userId: user.id,
      businessName: validated.name,
      slug,
      category: "general",
      description: "",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Failed to create account" };
  }
}
