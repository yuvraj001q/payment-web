import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = ["/", "/login", "/register", "/landing", "/api/auth"];
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  const isProfilePage =
    pathname !== "/" &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/register") &&
    !pathname.startsWith("/landing") &&
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/_next");

  if (isProfilePage) {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  let token = null;
  if (sessionToken) {
    try {
      const parts = sessionToken.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && payload.exp * 1000 > Date.now()) {
          token = payload;
        }
      }
    } catch {
      token = null;
    }
  }

  if (!isPublicPath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/dashboard") && token) {
    return NextResponse.next();
  }

  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
