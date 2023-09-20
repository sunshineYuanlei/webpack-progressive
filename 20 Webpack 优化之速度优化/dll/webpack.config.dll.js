const webpack = require("webpack")
const path = require("path")
// 这里是第三方依赖库
const vendors = ["react", "react-dom"]
const dllPath = "public/vendor"

module.exports = {
  mode: "production",
  entry: {
    // 定义程序中打包公共文件的入口文件vendor.js
    vendor: vendors,
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: "[name].dll.js",
    // 这里是使用将 verdor 作为 library 导出
    // vendor.dll.js中暴露的全局变量名
    // 保持与webpack.DllPlugin中名称一致
    library: "[name]_[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      // 这里是设置 mainifest.json 路径
      path: path.join(__dirname, dllPath, "[name]-mainfest.json"),
      // 保持与output.library
      name: "[name]_[hash]",
      context: process.cwd(),
    }),
  ],
}
