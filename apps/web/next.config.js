const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["hnswlib-node"],
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
  reactStrictMode: true,
  transpilePackages: [
    "@octocoach/charts",
    "@octocoach/embeddings",
    "@octocoach/i18n",
    "@octocoach/ui",
  ],
  webpack: (config) => ({
    ...config,
    experiments: { ...config.experiments, topLevelAwait: true },
  }),
};

module.exports = withVanillaExtract(nextConfig);
