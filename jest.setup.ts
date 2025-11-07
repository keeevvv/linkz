import "whatwg-fetch";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  // Kita membuat implementasi palsu (mock) untuk useRouter
  useRouter: () => ({
    push: jest.fn(), // jest.fn() adalah fungsi mock kosong
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  // Sebaiknya kita mock juga hook umum lainnya untuk menghindari error
  usePathname: () => "/", // Tes akan menganggap kita ada di 'homepage'
  useSearchParams: () => new URLSearchParams(), // Menyediakan searchParams kosong
}));
