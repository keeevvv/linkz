import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "static0.gamerantimages.com",
      "placehold.co",
      "dummyimage.com",
    ], // 👈 tambahkan domain ini
  },
};

export default nextConfig;
