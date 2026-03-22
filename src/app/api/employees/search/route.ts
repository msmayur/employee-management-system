import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  const employees = await prisma.employee.findMany({
    where: {
      isDeleted: false,
      OR: [
        { fullName: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { position: { contains: query, mode: "insensitive" } },
        { department: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { organization: true },
  });

  return NextResponse.json(employees);
}