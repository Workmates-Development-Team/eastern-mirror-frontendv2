import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['api.easternmirrornagaland.com', 'localhost', 'easternmirror-assets.s3.ap-south-1.amazonaws.com', 'westernmirror-assets.s3.ap-south-1.amazonaws.com'],
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
