import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const token = (await cookies()).get("token")?.value;
  //if token is not present redirect the user to login page which is accessible to every user
  if (!token) {
    redirect("/login");
  }
  
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden 
bg-gradient-to-br from-slate-100 via-white to-blue-100">

      {/* 🔥 Background Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      {/* Main Card */}
      <div className="relative bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-10 max-w-xl w-full text-center border">

        {/* Title */}
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-blue-600" />
          Employee Management System
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mb-8 leading-relaxed">
          Manage organizations and employees efficiently with a clean, modern, and scalable interface.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
          <div className="bg-white/70 border rounded-lg p-3 shadow-sm hover:shadow transition">
            ✔ Add Employees
          </div>
          <div className="bg-white/70 border rounded-lg p-3 shadow-sm hover:shadow transition">
            ✔ Edit & Update
          </div>
          <div className="bg-white/70 border rounded-lg p-3 shadow-sm hover:shadow transition">
            ✔ Search & Filter
          </div>
          <div className="bg-white/70 border rounded-lg p-3 shadow-sm hover:shadow transition">
            ✔ Soft Delete
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/employees"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium 
      hover:bg-gray-800 transition shadow"
        >
          Go to Dashboard →
        </Link>

      </div>
    </div>
  );
}