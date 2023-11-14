/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

module.exports = nextConfig;
