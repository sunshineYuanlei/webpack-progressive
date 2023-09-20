// 使用的时候，直接调用对应的方法即可：
const partsConfig = require("./webpack.parts.js")

module.exports = {
  mode: "production",
  devtool: "source-map",
  modules: {
    rules: [
      partsConfig.getCssLoader({ mode: "production" }),
      partsConfig.getUrlLoader({
        test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
        dir: "img",
      }),
    ],
  },
}
