import React, { useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="mx-auto flex h-16 items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-blue-600" href="#home">
          <img
            src="/images/logo-transparent.png"
            alt="Company Logo"
            className="h-20"
          />
        </Link>

        <div className="flex items-center gap-4">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-black transition hover:text-gray-500/75"
                  href="#home"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="text-black transition hover:text-gray-500/75"
                  href="#about"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-black transition hover:text-gray-500/75"
                  href="#feature"
                >
                  Feature
                </a>
              </li>
              <li>
                <a
                  className="text-black transition hover:text-gray-500/75"
                  href="#developer"
                >
                  CoffeJava
                </a>
              </li>
            </ul>
          </nav>

          <div className="hidden md:flex md:gap-4">
            <Link
              className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 transition hover:text-blue-600/75 md:block"
              href="/register"
            >
              Register
            </Link>
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
            <a
              href="#home"
              className="text-black block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-black block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50"
            >
              About
            </a>
            <a
              href="#feature"
              className="text-black block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50"
            >
              Feature
            </a>
            <a
              href="#developer"
              className="text-black block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50"
            >
              CoffeJava
            </a>

            <div className="py-2">
              <hr className="border-t border-gray-200" />
            </div>

            <Link
              href="/login"
              className="block rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block rounded-md bg-gray-100 px-5 py-2.5 text-center text-sm font-medium text-blue-600 transition hover:text-blue-600/75"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
