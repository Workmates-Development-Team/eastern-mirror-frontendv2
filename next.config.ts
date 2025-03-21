import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['api.easternmirrornagaland.com', 'localhost'],
  },
};

export default nextConfig;
