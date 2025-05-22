/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/my-awosome-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-awosome-portfolio/' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
