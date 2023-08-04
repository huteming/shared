const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  // mode: 'production',

  entry: './src/main.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src'),
    },
  },

  devServer: {
    open: false,
    hot: true,
    port: '8080',
  },

  module: {
    rules: [
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
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
}
