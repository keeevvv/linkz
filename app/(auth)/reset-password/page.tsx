import ResetPasswordForm from "@/components/resetPasswordForm";
import { checkSession } from "@/lib/checkSesion";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage() {
  const session = await checkSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="w-full w-full">
      <ResetPasswordForm />
    </div>
  );
}
