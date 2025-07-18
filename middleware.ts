import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const authRoutes = ["/dashboard"];
  const unauthRoutes = ["/login", "/register"];

  const pathname = req.nextUrl.pathname;
console.log(`Request path: ${pathname}`);

  // Allow unauthenticated routes
  if (unauthRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.next();
  }
  if (unauthRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect to login if accessing a protected route without a token
  if (authRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Default: Allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login/:path*"],
};
