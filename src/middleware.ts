import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/transfer");

  const isAuthRoute = pathname.startsWith("/auth");

  if (isProtectedRoute && !user) {
    const url = new URL("/auth", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/transfer",
    "/transfer/:path*",
    "/auth",
    "/auth/:path*",
  ],
};
