const path = require("path")

module.exports = {
  experimental: { 
    granularChunks: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'chungguo': path.resolve(__dirname),
    }
    return config;
  },
}