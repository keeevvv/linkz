"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="outline"
      className="border-red-500 text-red-500 hover:bg-red-50 w-full md:w-auto"
    >
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}

export default LogoutButton;
