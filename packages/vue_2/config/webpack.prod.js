const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { resolve } = require('./utils')

module.exports = (env) => {
  // webpack 支持直接传入环境变量
  // https://webpack.js.org/guides/environment-variables/
  const stats = env.stats

  return merge(common, {
    mode: 'production',

    plugins: [
      // github: https://github.com/mrsteele/dotenv-webpack#readme
      new Dotenv({
        path: resolve('.env.production'),
      }),
      // github: https://github.com/webpack-contrib/webpack-bundle-analyzer
      stats && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
  })
}
