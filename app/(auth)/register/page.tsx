import RegisterForm from "@/components/RegisterForm";
import { checkSession } from "@/lib/checkSesion";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await checkSession();
    if (session) {
        redirect("/dashboard");
    }

    return (
        <div className="w-full">
            <RegisterForm />
        </div>
    );
}
