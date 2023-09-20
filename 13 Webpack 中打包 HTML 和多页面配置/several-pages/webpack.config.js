const { getEntry, getHtmlWebpackPlugins } = require("./utils")

module.exports = async () => {
  return {
    mode: "development",
    entry: await getEntry(),
    plugins: [...(await getHtmlWebpackPlugins())],
  }
}

// 另一种写法：
// module.exports = {
//   mode: "development",
//   entry: {
//     index: "./src/pages/index.js",
//     list: "./src/pages/list.js",
//   },
//   plugins: [
//     new HtmlWebPackPlugin({
//       template: "./templates/index.html",
//       filename: "index.html",
//       chunks: ["index"],
//     }),
//     new HtmlWebPackPlugin({
//       template: "./templates/list.html",
//       filename: "list.html",
//       chunks: ["list"],
//     }),
//   ],
// }

// 如果是同一个 template/页面结构，那么可以只修改filename输出不同名的 HTML 即可：
// 但是这两个文件的特点是引入的 JavaScript 文件都是一样的，即都是main.js。
// 对于多入口，并且入口需要区分的情况，那么需要怎么处理呢？
// 这时候就需要借助 html-webpack-plugin 的两个参数了：chunks和excludeChunks。chunks是当前页面包含的 chunk 有哪些，可以直接用 entry 的key来命名，excludeChunks则是排除某些 chunks。
// 例如，现在有两个 entry，分别是index.js和list.js，我们希望index.html跟index.js是一组，list.html跟list.js是一组，那么 webpack.config.js 需要改为如上

// 我们写的代码最终还是需要页面来承载展现，本小节主要介绍 Webpack 的 html-webpack-plugin 插件的使用方法。通过 html-webpack-plugin 我们可以生成包含 Webpack 打包后资源的 HTML 页面。针对 Webpack 中多页应用的打包，我们可以配置多个 html-webpack-plugin 插件实例。
// 我们还可以按照文章介绍的多页应用最佳实践的方案，通过约定目录规范来通过 Node.js 代码来自动生成 Webpack 的多页应用配置。html-webpack-plugin 是 Webpack 中很重要的一个插件，基于这个插件的 API 我们可以做很多跟页面相关的优化项目，比如预取资源、实现 modern 打包等，后面的实战章节会继续介绍。
