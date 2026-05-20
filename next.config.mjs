/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ⚡ Add this native Next.js proxy rewrite:
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://drivefleet-server-beige.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig; // Or 'export default nextConfig' if using .mjs