import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.yandex.net",
      },
      {
        protocol: "https",
        hostname: "*.vkuserphoto.ru",
      },
      {
        protocol: "https",
        hostname: "sun*.userapi.com",
      },
      {
        protocol: "http",
        hostname: "avt.appsmail.ru",
      },
      {
        protocol: "https",
        hostname: "avt.appsmail.ru",
      },
    ],
  },
};

export default nextConfig;
