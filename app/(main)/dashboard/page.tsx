import { checkSession } from "@/lib/checkSesion";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function dashboardPage() {
  const session = await checkSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {session.user.name}!
              </p>
            </div>
            <LogoutButton />
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {session.user.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">User ID:</span> {session.user.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
