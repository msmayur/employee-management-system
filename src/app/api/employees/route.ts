import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";
import { employeeSchema } from "@/lib/validations";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    const employees = await prisma.employee.findMany({
      where: { isDeleted: false },
      include: { organization: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.employee.count({
      where: { isDeleted: false },
    });

    return NextResponse.json({ employees, total });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}





export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = employeeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.create({
      data: {
        ...body,
        joiningDate: new Date(body.joiningDate),
      },
    });

    return NextResponse.json(employee);
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}
