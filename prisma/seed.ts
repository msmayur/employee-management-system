import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });

  const prisma=new PrismaClient({
    adapter,
  })

async function main() {
  console.log(" Seeding database...");

  // 🔐 Create demo user (SAFE - no duplicates)
  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      password: hashedPassword,
    },
  });

  console.log("👤 User:", user.email);

  // 🏢 Organizations (SAFE)
  const google = await prisma.organization.upsert({
    where:{
        name:"Google"
    }, 
    update: {},
    create: {
      name: "Google",
      industry: "Tech",
      description: "Search & Cloud",
    },
  });

  const tesla = await prisma.organization.upsert({
    where: { name: "Tesla" },
    update: {},
    create: {
      name: "Tesla",
      industry: "Automobile",
      description: "Electric Vehicles",
    },
  });

  console.log("🏢 Organizations seeded");

  // 👨‍💼 Employees (SAFE)
  await prisma.employee.upsert({
    where: { email: "john@test.com" },
    update: {},
    create: {
      fullName: "John Doe",
      email: "john@test.com",
      phone: "9876543210",
      position: "Developer",
      department: "IT",
      joiningDate: new Date(),
      salary: 50000,
      status: "ACTIVE",
      organizationId: google.id,
    },
  });

  await prisma.employee.upsert({
    where: { email: "jane@test.com" },
    update: {},
    create: {
      fullName: "Jane Smith",
      email: "jane@test.com",
      phone: "9123456780",
      position: "Manager",
      department: "HR",
      joiningDate: new Date(),
      salary: 80000,
      status: "ACTIVE",
      organizationId: tesla.id,
    },
  });

  await prisma.employee.upsert({
    where: { email: "mark@test.com" },
    update: {},
    create: {
      fullName: "Mark Lee",
      email: "mark@test.com",
      phone: "9988776655",
      position: "Analyst",
      department: "Finance",
      joiningDate: new Date(),
      salary: 60000,
      status: "INACTIVE",
      organizationId: google.id,
    },
  });

  console.log("👨‍💼 Employees seeded");

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });