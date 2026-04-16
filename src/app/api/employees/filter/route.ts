import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Status } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const org = searchParams.get("org");
  const dept = searchParams.get("dept");
  const status = searchParams.get("status");

  const employees = await prisma.employee.findMany({
    where: {
      isDeleted: false,
      organizationId: org || undefined,
      department: dept
        ? { equals: dept, mode: "insensitive" }
        : undefined,
      status: status
        ? Status[status.toUpperCase() as keyof typeof Status]
        : undefined,
    },
    include: { organization: true },
  });

  return NextResponse.json(employees);
}