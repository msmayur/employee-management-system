import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params

    await prisma.employee.update({
      where: { id },
      data: { isDeleted: false },
    });

    return NextResponse.json({ message: "Restored successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Restore failed" },
      { status: 500 }
    );
  }
}