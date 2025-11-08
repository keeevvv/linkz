// jest.config.ts

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

// Ini adalah konfigurasi dasar Anda.
const baseConfig: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  // --- 👇 TAMBAHKAN BARIS INI 👇 ---
  /**
   * Mengatur lingkungan tes ke 'jsdom' (browser-like)
   * Ini akan menyediakan objek global seperti 'document' dan 'window'
   * yang diperlukan oleh @testing-library/react.
   */
  testEnvironment: "jest-environment-jsdom",
  // --- 👆 SELESAI 👆 ---
};

// ==========================================================
// Sisa file Anda (fungsi async) biarkan sama persis.
// ==========================================================
export default async (): Promise<Config> => {
  // 1. Buat konfigurasi default dari next/jest
  const nextJestConfig = await createJestConfig(baseConfig)();

  // 2. Timpa 'transformIgnorePatterns' secara manual
  nextJestConfig.transformIgnorePatterns = [
    "/node_modules/(?!(ogl|gsap|nanostores|better-auth)/)",
    "^.+\\.module\\.(css|sass|scss)$",
  ];

  // 3. Kembalikan konfigurasi yang sudah dimodifikasi
  return nextJestConfig;
};
