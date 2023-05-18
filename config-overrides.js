const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};

  Object.assign(fallback, {
    assert: false,
    crypto: false,
    fs: false,
    http: false,
    https: false,
    net: false,
    os: false,
    path: false,
    stream: false,
    tls: false,
    url: false,
    util: false,
    zlib: false,
    async_hooks: false,
  });
  config.resolve.fallback = fallback;

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: [require.resolve("buffer/"), "Buffer"],
    }),
  ]);

  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf instanceof Array) {
      rule.oneOf[rule.oneOf.length - 1].exclude = [
        /\.(js|mjs|jsx|cjs|ts|tsx)$/,
        /\.html$/,
        /\.json$/,
      ];
    }
    return rule;
  });

  // Ignore some warnings
  config.ignoreWarnings = [
    /Failed to parse source map/, // until fixed by cra https://github.com/facebook/create-react-app/pull/11752
  ];

  return config;
};
