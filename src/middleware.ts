import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  allRoutes,
  authRoutes,
  privateRoutes,
  routes,
} from "@/config/routes";

export async function middleware(request: NextRequest) {
  // For auth routes,  if we get token redirect to home.
  if (authRoutes.includes(request.nextUrl.pathname)) {
    if (request.cookies.has("token")) {
      return NextResponse.redirect(new URL(routes.home, request.url));
    }
  }

  // For private route. Check the token and redirect to login if no token.
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    if (!request.cookies.has("token")) {
      return NextResponse.redirect(new URL(routes.auth.login, request.url));
    }

    // Get the token and search for user.
    const token = request.cookies.get("token");

    if (token) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/light-user`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
        const user = await response.json();
        
      } catch (e) {
        // redirect to login if there is an error.
        // delete the toke before redirection.
        const response = NextResponse.redirect(
          new URL(`${routes.auth.login}?e=${e}`, request.url)
        );

        response.cookies.delete("token");
        return response;
      }
    } else {
      // delete and redirect if the token is not defined.
      const response = NextResponse.redirect(
        new URL(routes.auth.login, request.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }
}

// leschemins qui seront pris en charge par le middleware
export const config = {
  matcher: [
    ...allRoutes
  ],
};
