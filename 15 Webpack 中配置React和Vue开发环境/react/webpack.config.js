const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "production",
  entry: "./src/index.jsx",
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // jsx/js文件的正则
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
    }),
  ],
}

// Tips：
// 注意这里将 Babel 的配置直接放到webpack.config.js中，没有单独放到.babelrc，这是一个推荐写法，因为在某些打包（上线构建）机器，对于.开头的 dotFile 支持并不好，所以建议.babelrc这类 dotFile 在webpack.config.js中显性声明，显性声明的配置还能第一时间在 Webpack 配置中被找到。
