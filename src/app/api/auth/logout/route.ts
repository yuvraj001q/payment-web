export const runtime = "edge";

import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/jwt";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
