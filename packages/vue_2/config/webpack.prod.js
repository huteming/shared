const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const Dotenv = require('dotenv-webpack')
const { resolve } = require('./utils')

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    // github: https://github.com/mrsteele/dotenv-webpack#readme
    new Dotenv({
      path: resolve('.env.production'),
    }),
  ],
})
