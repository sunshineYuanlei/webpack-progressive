module.exports = {
  entry: "./app.js",
  mode: "development",
  devtool: false,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "less-loader", // 将 Less 编译为 CSS
        ],
      },
    ],
  },
}

// Tips:
// Tips：注意一些预处理语言需要安装对应的解析器，例如 sass-loader，需要同时安装 node-sass：npm install sass-loader node-sass --save-dev
