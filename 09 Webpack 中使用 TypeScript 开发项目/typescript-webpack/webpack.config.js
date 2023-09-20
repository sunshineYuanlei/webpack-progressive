module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "app.js",
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
            },
          },
        ],
      },
    ],
  },
}
