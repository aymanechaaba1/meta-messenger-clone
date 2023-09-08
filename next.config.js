/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      '1000logos.net',
      'avatars.githubusercontent.com',
      'yt3.googleusercontent.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
