"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("/api/auth/register", data);
      toast.success("Account created!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow w-[350px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <Input placeholder="Email" {...register("email")} />
        <Input type="password" placeholder="Password" {...register("password")} />

        <Button className="w-full">Create Account</Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}