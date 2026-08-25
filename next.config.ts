import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["192.168.1.136", "192.168.50.212"],
};

export default nextConfig;
