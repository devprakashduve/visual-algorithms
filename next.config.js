/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-spring/three'], // Add this line
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    }
    )

    return config
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
