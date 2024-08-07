// @ts-check

const baseUrl = new URL(
  /** @type {string} */ (process.env.NEXT_PUBLIC_BASE_URL),
);

/**
 * @type {import("next").NextConfig}
 */
export default {
  experimental: {
    esmExternals: true,
  },
  assetPrefix: baseUrl.href,
  basePath: baseUrl.pathname.replace(/\/$/, ""),
  output: "export",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: "worker-loader",
      options: {
        filename: "static/[fullhash].worker.js",
        publicPath: "/_next/",
      },
    });

    return config;
  },
};
