import { checkSession } from "@/lib/checkSesion";
import { redirect } from "next/navigation";

export default async function dashboardPage() {
  const session = await checkSession();
  if (!session) {
    redirect("/login");
  }
  return <h1>test protected route</h1>;
}
