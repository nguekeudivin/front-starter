import { NextRequest, NextResponse } from "next/server";
import { allRoutes, authRoutes, privateRoutes, routes } from "@/config/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // 🔁 1. AUTH ROUTES — redirect logged-in users to home
  if (authRoutes.includes(pathname)) {
    if (token) {
      // Optional: quickly check validity from backend
      const isValid = await validateToken(token);
      if (isValid) {
        return NextResponse.redirect(new URL(routes.home, request.url));
      }
    }
    return NextResponse.next();
  }

  // 🔒 2. PRIVATE ROUTES — must have a valid backend token
  if (privateRoutes.includes(pathname)) {
    if (!token) {
      const res = NextResponse.redirect(new URL(routes.auth.login, request.url));
      res.cookies.delete("token");
      return res;
    }

    const user = await validateToken(token);
    if (!user) {
      const res = NextResponse.redirect(
        new URL(`${routes.auth.login}?error=auth`, request.url)
      );
      res.cookies.delete("token");
      return res;
    }

    // Optionally attach user info (if backend returns user)
    const response = NextResponse.next();
    response.headers.set("x-user", JSON.stringify(user));
    return response;
  }

  // ✅ 3. All other routes → allow
  return NextResponse.next();
}

/**
 * Validate token with your backend
 */
async function validateToken(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/light-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Optional: reduce latency and prevent long blocking
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data; // your backend returns user info here
  } catch {
    return null;
  }
}

export const config = {
  matcher: [...allRoutes],
};
