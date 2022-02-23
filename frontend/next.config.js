/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath:process.env.DEPLOY=="cdn"?"/next":"",
  assetPrefix:".",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*' // Proxy to Backend
      }
    ]
  },
  
}

module.exports = nextConfig


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})