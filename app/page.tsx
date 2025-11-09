"use client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import NavBar from "@/components/LandingNavBar";
import dynamic from "next/dynamic";
import LazyLoad from "@/components/LazyLoad";

const LandingHome = dynamic(() => import("@/components/LandingHome"));

const LandingAbout = dynamic(() => import("@/components/LandingAbout"));
const LandingFeature = dynamic(() => import("@/components/LandingFeature"));
const LandingHowItWork = dynamic(() => import("@/components/LandingHowItWork"));

// Untuk komponen berat, tambahkan ssr: false
const LandingDeveloper = dynamic(
  () => import("@/components/LandingDeveloper"),
  {
    ssr: false,
  }
);
const LandingFooter = dynamic(() => import("@/components/LandingFooter"));

export default function Home() {
  const sesion = useSession();
  const router = useRouter();

  if (sesion.data?.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavBar />
      <LandingHome />

      <LazyLoad placeholderHeight="100vh">
        <LandingAbout />
      </LazyLoad>
      <LazyLoad placeholderHeight="100vh">
        <LandingFeature />
      </LazyLoad>
      <LazyLoad placeholderHeight="100vh">
        <LandingHowItWork />
      </LazyLoad>
      <LazyLoad placeholderHeight="100vh">
        <LandingDeveloper />
      </LazyLoad>

      <LandingFooter />
    </div>
  );
}
