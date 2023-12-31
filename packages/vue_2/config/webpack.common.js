const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { resolve } = require('./utils')

module.exports = {
  entry: resolve('src/main.ts'),

  output: {
    clean: true,
    path: resolve('dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      // fix: [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available.
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },

  devServer: {
    open: false,
    hot: true,
    port: '8080',
  },

  plugins: [
    // github: https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'webpack 搭建 vue 项目',
      minify: false,
    }),
    // 文档: https://vue-loader.vuejs.org/zh/guide
    new VueLoaderPlugin(),
  ],

  module: {
    rules: [
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.(ts|js)x?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
      },
    ],
  },
}
