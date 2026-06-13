export const runtime = 'edge';

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProfileBySlug } from "@/db/queries";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const profile = await getProfileBySlug(slug);
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: profile.id,
    businessName: profile.businessName,
    slug: profile.slug,
    description: profile.description,
    category: profile.category,
    logoUrl: profile.logoUrl,
    coverImageUrl: profile.coverImageUrl,
    city: profile.city,
    state: profile.state,
    country: profile.country,
  });
}
