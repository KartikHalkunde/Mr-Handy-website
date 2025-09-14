import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure proper handling of static files
  trailingSlash: false,
  // Optimize for Vercel deployment
  output: 'standalone',
};

export default nextConfig;
