/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://www.petertechyautomation.com',
  },
};

module.exports = nextConfig;

