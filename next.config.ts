import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cihkzrmbfdbfnbmzslya.supabase.co',
        pathname: '/storage/v1/object/public/saversbucket/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  // Add other config options here
};

export default nextConfig;