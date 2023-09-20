const path = require("path")

const HtmlWebPackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  stats: {
    colors: true,
  },
  // 将 jsx 添加到默认扩展名中，省略 jsx
  entry: ['./src/index.jsx', './src/dev.js'],
  devServer: {
    static: {
      directory: path.join(__dirname, "./src/"),
      publicPath: "/",
    },
    host: "0.0.0.0", // 127.0.0.1
    port: 3000,
    hot: true,
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // jsx文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          // loader 是 babel
          loader: "babel-loader",
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              // 添加 preset-react
              require.resolve("@babel/preset-react"),
              [require.resolve("@babel/preset-env"), { modules: false }],
            ],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "index.html",
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

// Tips:
// Tips：当然还可以将 webpack.config.js 继续拆分，将公共部分放到webpack.config.base.js部分，然后使用webpack-merge来合并配置项，这里不再展开，参考[TODO](dev。md 相关的文件链接)。
