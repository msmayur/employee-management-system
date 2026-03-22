"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Users, Building2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };


  if (pathname === "/login" || pathname === "/register" || pathname === "/") {
    return null;
  }

  return (
    <div className="border-b bg-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Users className="w-5 h-5" />
          EMS SaaS
        </h1>

        {/* Links */}
        <div className="flex gap-2">
          <Link href="/employees">
            <Button variant={pathname === "/employees" ? "default" : "ghost"}>
              <Users className="w-4 h-4 mr-1" />
              Employees
            </Button>
          </Link>

          <Link href="/organizations">
            <Button variant={pathname === "/organizations" ? "default" : "ghost"}>
              <Building2 className="w-4 h-4 mr-1" />
              Organizations
            </Button>
          </Link>
          <Link href="/employees/deleted">
            <Button variant="ghost">
              <Trash2 className="w-4 h-4 mr-1" />
              Deleted
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}