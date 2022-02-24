/** @type {import('next').NextConfig} */

require('dotenv').config({ path: __dirname + "/../.env" })

// console.log("process.env.NAME",process.env.NAME)


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

