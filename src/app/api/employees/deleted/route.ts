import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        isDeleted: true,
      },
      include: {
        organization: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(employees);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch deleted employees" },
      { status: 500 }
    );
  }
}