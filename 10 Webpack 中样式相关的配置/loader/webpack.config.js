const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    // filename: '[name].js',
    filename: "cssInJs.js",
    path: __dirname + "/bundle",
  },
  mode: "development",
  devtool: false,
  plugins: [
    // 添加 plugin
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
}

// Tips:
// mini-css-extract-plugin这个使用的时候需要分别配置 loader 和 plugin，loader 需要放在css-loader之后代替style-loader：
