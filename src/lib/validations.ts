import { z } from "zod";

export const employeeSchema = z.object({
  fullName: z
    .string()
    .min(2)
    .regex(/^[A-Za-z ]+$/, "Only letters allowed"),

  email: z.string().email(),

  phone: z
  .string()
  .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  position: z.string().min(1),
  department: z.string().min(1),
  organizationId: z.string(),

  joiningDate: z.string(),

  salary: z.number().positive().optional(),

  status: z.enum(["ACTIVE", "INACTIVE"]),
});