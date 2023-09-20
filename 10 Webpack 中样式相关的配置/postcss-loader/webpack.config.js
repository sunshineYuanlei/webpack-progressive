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
              importLoader: 2,
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      },
    ],
  },
}

// Tips:
// PostCSS 配置
// 通过 PostCSS 的强大插件系统，不仅可以处理 CSS 语法，还可以处理 CSS 预处理器的语法，实现的功能也有很多，包括添加前缀、最新语法转义、压缩等，甚至可以扩展 CSS 的语言特性。配置了 postcss-loader 之后，WebPack 就可以使用 PostCSS 来处理 CSS了。但是 PostCSS 本身只不过是将 CSS 解析成 AST ，真正起作用的还需要依赖其强大的插件系统。

// 所以，PostCSS 配置其实主要是配置其使用哪些插件，PostCSS 的配置写法有以下三种方式：

// 通过配置文件postcss.config.js，一般放置在项目的根目录下；
// 通过 loader 的配置项options；
// 直接在 package.json 中添加个postcss属性。
