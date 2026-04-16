import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax", 
    path: "/login",
    maxAge: 0, 
  });

  return res;
}