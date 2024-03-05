const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This is a workaround to prevent build from using > 8GB RAM
    cpus: 2,
    workerThreads: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "**.blob.vercel-storage.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  reactStrictMode: true,
  transpilePackages: [
    "@octocoach/charts",
    "@octocoach/i18n",
    "@octocoach/ui",
    "@octocoach/db",
  ],
  webpack: (config) => {
    config = {
      ...config,
      experiments: { ...config.experiments, topLevelAwait: true },
    };
    return config;
  },
};

module.exports = withBundleAnalyzer(withVanillaExtract(nextConfig));
