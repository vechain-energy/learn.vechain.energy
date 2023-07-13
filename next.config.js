/** @type {import('next').NextConfig} */
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true
});

const isProduction = process.env.NODE_ENV === "production";
const assetPrefix = isProduction ? "" : "";

const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  assetPrefix,
  basePath: assetPrefix,
  async redirects() {
    return [
      {
        source: '/vechain.energy/identify-users',
        destination: '/vechain.energy/AuthService',
        permanent: true,
      },
    ]
  },
};

module.exports = {
  ...withNextra(),
  ...nextConfig,
};