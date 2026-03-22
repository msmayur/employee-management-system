"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/lib/validations";
import { z } from "zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = z.infer<typeof employeeSchema>;

export default function EmployeeForm({ refresh }: { refresh: () => void }) {
  const [orgs, setOrgs] = useState<any[]>([]);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    axios.get("/api/organizations").then((res) => setOrgs(res.data));
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("/api/employees", data);
      toast.success("Employee created");
      reset();
      setValue("status", "ACTIVE"); // optional default
      setValue("organizationId", "");
      refresh();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Error");
    }
  };

  const handleReset = () => {
    reset({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      organizationId: "",
      joiningDate: "",
      salary: undefined,
      status: "ACTIVE",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4 mb-6"
    >
      <Input placeholder="Full Name" {...register("fullName")} />
      <Input placeholder="Email" {...register("email")} />
      <Input placeholder="Phone" maxLength={10} onInput={(e: any) => {
        e.target.value = e.target.value.replace(/\D/g, "");
      }}{...register("phone")} />
      <Input placeholder="Position" {...register("position")} />
      <Input placeholder="Department" {...register("department")} />
      {errors.phone && (
        <p className="text-red-500 text-sm">
          {errors.phone.message}
        </p>
      )}
      {errors.organizationId && (
        <p className="text-red-500 text-sm">
          Organization is required
        </p>
      )}

      {/* Organization Select */}
      <Select
        value={watch("organizationId") ?? ""}
        onValueChange={(val) => setValue("organizationId", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Organization" />
        </SelectTrigger>
        <SelectContent position="popper" className="z-50 bg-white border shadow-lg">
          {orgs.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input type="date" {...register("joiningDate")} />

      <Input
        type="number"
        placeholder="Salary"
        {...register("salary", { valueAsNumber: true })}
      />

      {/* Status */}
      <Select
        value={watch("status") ?? ""}
        onValueChange={(val) => setValue("status", val as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent position="popper" className="z-50 bg-white border shadow-lg">
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="INACTIVE">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex w-full justify-center">
        <Button type="submit" className="w-1/2">
          Add Employee
        </Button>
        <Button
        className="w-1/2 ml-2"
          type="button"
          variant="default"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}