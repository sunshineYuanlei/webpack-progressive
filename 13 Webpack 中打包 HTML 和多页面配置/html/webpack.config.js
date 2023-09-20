const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  // plugins: [new HtmlWebPackPlugin({title: 'lei', filename: 'foo.html'})]
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.pug",
    }),
  ],
  module: {
    rules: [{ test: /\.pug$/, use: ["html-loader", "pug-html-loader"] }],
  },
}

// Tips：使用 JavaScript 模板引擎，还可以定义一些变量，通过 html-webpack-plugin 传入进去。
