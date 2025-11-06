import React, { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

type MainNavbarProps = {
  type: "dashboard" | "themes";
};

const MainNavbar = ({ type }: MainNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="mx-auto flex h-16 items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex">
          <img
            src="/images/logo-transparent.png"
            alt="Company Logo"
            className="h-20"
          />

          <div className="my-auto font-bold text-lg">
            {type === "dashboard" && <span>Dashboard Navbar</span>}
            {type === "themes" && <span>Themes Navbar</span>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex md:gap-4">
            {type === "themes" && (
              <Link
                className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                href="/dashboard"
              >
                Dahsboard
              </Link>
            )}
            {type === "dashboard" && (
              <Link
                className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                href="/themes"
              >
                Themes
              </Link>
            )}
            <LogoutButton />
          </div>

          <div className="block md:hidden">
            <button
              className="rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <div className="py-2">
              <hr className="border-t border-gray-200" />
            </div>

            {type === "themes" && (
              <Link
                className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                href="/dashboard"
              >
                Dahsboard
              </Link>
            )}
            {type === "dashboard" && (
              <Link
                className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                href="/themes"
              >
                Themes
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;
