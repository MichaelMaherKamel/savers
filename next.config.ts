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
  /* config options here */
};

export default nextConfig;