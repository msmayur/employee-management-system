import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();

    const existing = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existing || existing.isDeleted) {
      return NextResponse.json(
        { error: "Employee not found or deleted" },
        { status: 404 }
      );
    }

    const updated = await prisma.employee.update({
      where: { id },
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        position: body.position,
        department: body.department,
        salary: body.salary ? Number(body.salary) : null,
        status: body.status,
      
        ...(body.joiningDate && {
          joiningDate: new Date(body.joiningDate),
        }),
      
        ...(body.organizationId && {
          organization: {
            connect: { id: body.organizationId },
          },
        }),
      }
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: "Update failed", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 

  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { organization: true },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json(
      { error: "Fetch failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.employee.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json({ message: "Employee deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}