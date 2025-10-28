"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import NavBar from "@/components/LandingNavBar";
import LandingHome from "@/components/LandingHome";
import LandingAbout from "@/components/LandingAbout";
import LandingFeature from "@/components/LandingFeature";
import LandingDeveloper from "@/components/LandingDeveloper";
import LandingFooter from "@/components/LandingFooter";

export default function Home() {
  const sesion = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    if (sesion) {
      console.log("test");
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    }
  };
  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavBar />
      <LandingHome />
      <LandingAbout />
      <LandingFeature />
      <LandingDeveloper />
      <LandingFooter />
    </div>
  );
}
