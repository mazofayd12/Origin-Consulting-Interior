/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'localhost'],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
