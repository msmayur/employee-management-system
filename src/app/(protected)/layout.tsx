import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;

  //Not logged in
  if (!token) {
    redirect("/login");
  }

  //Invalid token
  try {
    verifyToken(token);
  } catch {
    redirect("/login");
  }

  //Authorized
  return <>{children}</>;
}