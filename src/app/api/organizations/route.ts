import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all organizations
export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orgs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}

// CREATE organization
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Organization name is required" },
        { status: 400 }
      );
    }

    const org = await prisma.organization.create({
      data: {
        name: body.name,
        industry: body.industry,
        description: body.description,
      },
    });

    return NextResponse.json(org);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create organization" },
      { status: 500 }
    );
  }
}