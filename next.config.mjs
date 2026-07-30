/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ayurhub',
  assetPrefix: '/ayurhub',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
