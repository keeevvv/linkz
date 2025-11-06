import { checkSession } from "@/lib/checkSesion";
import { redirect } from "next/navigation";
import { getLinks } from "./action";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await checkSession();
  if (!session) redirect("/login");

  const links = await getLinks(session.user.id);

  return (
    <div>
      <DashboardClient
        links={links}
        userId={session.user.id}
        userName={session.user.username}
      />
    </div>
  );
}
