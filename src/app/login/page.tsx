"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie.includes("token=");
    if (hasToken) {
      window.location.href = "/";
    }
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await axios.post("/api/auth/login", data);

      toast.success("Login successful");

      window.location.href = "/"; // ✅ correct redirect
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

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <Button className="w-full">Login</Button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}