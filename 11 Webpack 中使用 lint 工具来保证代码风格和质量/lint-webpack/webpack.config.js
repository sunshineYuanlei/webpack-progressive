const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: `${__dirname}/bundle`,
  },
  mode: "development",
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [path.resolve(__dirname, "src")], // 指定检查的目录
        options: {
          // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require("eslint-friendly-formatter"), // 指定错误报告的格式规范
        },
      },
    ],
  },
}
