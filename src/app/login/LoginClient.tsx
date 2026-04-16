"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginClient() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("/api/auth/login", data);

      toast.success("Login successful");

      window.location.href = "/"; // ✅ correct
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-[350px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <Input placeholder="Email" {...register("email")} />
        <Input type="password" placeholder="Password" {...register("password")} />

        <Button className="w-full">Login</Button>
      </form>
    </div>
  );
}