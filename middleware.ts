import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: any) {
  console.log("🔥 PROXY RUNNING:", req.nextUrl.pathname);
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/login", "/register"];

  // 🔓 1. Public routes
  if (publicRoutes.includes(pathname)) {
    // Prevent logged-in users from accessing login/register
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 🔒 2. Protect all other routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔐 3. Verify token strictly
  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/employees/:path*",
    "/organizations/:path*",
  ],
};