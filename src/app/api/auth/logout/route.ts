import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/login", req.url));

  // ✅ Properly delete cookie (must match original settings)
  res.headers.set(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
  );

  return res;
}