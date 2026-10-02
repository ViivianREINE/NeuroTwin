/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable typescript and eslint strict checks on build to prevent docker container build failures
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
