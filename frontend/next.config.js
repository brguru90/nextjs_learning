/** @type {import('next').NextConfig} */

require('dotenv').config({ path: __dirname + "/../.env" })

// console.log("process.env.NAME",process.env.NAME)


const nextConfig = {
  reactStrictMode: true,
  basePath:process.env.DEPLOY=="cdn"?"/next":"",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:${process.env.SERVER_PORT}/api/:path*` // Proxy to Backend
      }
    ]
  },
  
}


if(process.env.NODE_ENV=="production"){
  nextConfig.assetPrefix="."
}

module.exports = nextConfig

