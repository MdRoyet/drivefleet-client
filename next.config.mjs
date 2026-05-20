/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://drivefleet-server-beige.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;