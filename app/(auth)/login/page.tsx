import LoginForm from "@/components/LoginForm";
import { auth } from "@/lib/auth";
import { checkSession } from "@/lib/checkSesion";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await checkSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="w-full w-full">
      <LoginForm />
    </div>
  );
}
