/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ssh|(ecosystem\.config|s3)\.js$/,
      use: "ignore-loader",
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/test-bucket/**",
      },
    ],
  },
}

module.exports = nextConfig
