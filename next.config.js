/** @type {import('next').NextConfig} */
const nextConfig = {
  //  basePath: "/transparencia"
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
