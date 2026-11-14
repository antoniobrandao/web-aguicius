import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Content images arrive from the platform as absolute URLs on its public blob
    // CDN, so the optimiser has to be allowed to fetch that host.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async headers() {
    // Lets Casa Digital's backoffice frame the site for the live preview of its
    // website blocks.
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://www.casadigital.pt",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
