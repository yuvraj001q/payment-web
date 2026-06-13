import { cookies } from "next/headers";
import { verifyJWT, AUTH_COOKIE } from "@/lib/jwt";

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  const secret = process.env.NEXTAUTH_SECRET!;
  const payload = await verifyJWT<{ id: string; name: string; email: string; role: string }>(token, secret);
  if (!payload) return null;

  return {
    user: {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    },
  };
}
