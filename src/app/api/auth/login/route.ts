import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const token = signToken({ userId: user.id });

    const res = NextResponse.json({ message: "Login successful" });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}