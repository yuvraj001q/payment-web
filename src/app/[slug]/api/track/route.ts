

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProfileBySlug } from "@/db/queries";
import { trackTileClick } from "@/db/queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, tileId, country, device, referrer } = body;

    if (!slug || !tileId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const profile = await getProfileBySlug(slug);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    await trackTileClick(profile.id, tileId, {
      country,
      device,
      referrer,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
