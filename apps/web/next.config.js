const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["hnswlib-node"],
  },
  reactStrictMode: true,
  transpilePackages: [
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
