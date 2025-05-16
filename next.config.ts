import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['api.easternmirrornagaland.com', 'localhost'],
  },

  async redirects() {
    return [
      {
        source: '/:slug+/',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
