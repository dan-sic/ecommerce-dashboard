const path = require("path")
const dotenv = require("dotenv")
dotenv.config()

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
module.exports = (phase, defaultConfig) =>
  withBundleAnalyzer({
    ...defaultConfig,
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
  })
