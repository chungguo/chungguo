const path = require("path")

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'chungguo': path.resolve(__dirname),
    }
    return config;
  },
}