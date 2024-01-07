import path from "path"
import dotenv from "dotenv"

dotenv.config()

/** @type {import('next').NextConfig} */
export const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      include: [
        path.resolve(__dirname, "./s3.mjs"),
        path.resolve(__dirname, "./ecosystem.config.js"),
      ],
      use: "ignore-loader",
    })

    return config
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_S3_HOST],
  },
}
