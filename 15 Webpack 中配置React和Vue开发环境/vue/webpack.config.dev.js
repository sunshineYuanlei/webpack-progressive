const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: ['./src/index.js', './src/dev.js'],
  devtool: "cheap-module-source-map",
  stats: {
    colors: true,
  },
  // 优化访问方式
  resolve: {
    extensions: [".*", ".js", ".vue", ".json"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./src/"),
      publicPath: "/",
    },
    host: "0.0.0.0", // 127.0.0.1
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}


