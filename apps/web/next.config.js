import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import bundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line no-undef
  enabled: process.env.ANALYZE === "true",
});

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config = {
      ...config,
      experiments: { ...config.experiments, topLevelAwait: true },
    };
    return config;
  },
};

export default withBundleAnalyzer(withVanillaExtract(nextConfig));
