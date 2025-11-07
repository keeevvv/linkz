import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { checkSession } from "@/lib/checkSesion";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage() {
  const session = await checkSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="w-full w-full">
      <ForgotPasswordForm />
    </div>
  );
}
