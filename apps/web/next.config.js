module.exports = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  transpilePackages: ["@octocoach/embeddings", "ui"],
  webpack: (config) => ({
    ...config,
    experiments: { ...config.experiments, topLevelAwait: true },
    externals: ["hnswlib-node"],
  }),
};
