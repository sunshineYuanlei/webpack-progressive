const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  optimization: {
    // 开启Scope Hoisting/作用域提升, 把不同模块打包成一个函数（可以让webpack打包出来的代码文件体积更小, 运行更快）
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        // 使用 cache，加快二次构建速度
        cache: true,
        parallel: true, // 多线程
        terserOptions: {
          comments: false,
          // 删除冗余代码以进一步压缩体积
          compress: {
            // 删除无用的代码
            unused: true,
            // 删掉 debugger
            drop_debugger: true, // eslint-disable-line
            // 移除 console
            drop_console: true, // eslint-disable-line
            // 移除无用的代码
            dead_code: true, // eslint-disable-line
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[contenthash:8].css",
    }),
    // optimize-css-assets-webpack-plugin 插件默认的 cssnano 配置已经做的很友好了，不需要额外的配置就可以达到最佳效果。
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"), // 这里指定了引擎，不指定默认也是 cssnano
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
}

// Tips:
// 虽然生产模式下webpack自带压缩功能, 但是我们仍然可以自定义压缩插件和对应配置来进行更为合理的打包体积优化操作

// module one（JS）
// 其他代码级别优化技巧:
// 合理划分代码职责, 并使用对应的按需加载
// 善用webpack-bundle-analyzer插件, 帮助分析webpack打包后的模块依赖关系和可视化查看各模块的体积大小, 针对性减小体积如换成较小的模块等（moment库转date-fns库）;使用 lodash、momentjs 这类库，不要一股脑引入，要按需引入
// 设置合理的SplitChunks分组

// 更细化一点:
// 合理使用hash占位符，防止因额外的文件名变化而导致的HTTP缓存过期
// 合理使用 polyfill，防止多余的代码；
// 使用 ES6 语法，尽量不使用具有副作用的代码，以加强 Tree-Shaking 的效果；
// 使用webpack的Scope Hoisting/作用域提升功能

// 对组件库的针对性优化：
// 对于UI组件库可以进行针对性优化, 比如AntDesign、ElementUI等可以使用babel-plugin-import这类插件/工具进行优化

// module two（JS）
// 其实 webpack 4 中，在 production 模式下已经根据大多数项目的优化经验做了通用的配置，类似 Tree-Shaking、Scope Hoisting 都是默认开启的，而且最新版本的 Webpack 使用的压缩工具就是 terser-webpack-plugin。

// module three（CSS）
// webpack本身是js的打包器，在css方面利用强大的社区插件，也可以实现CSS优化（包括代码压缩混淆等） 👉

// 生产环境CSS 导出和压缩使用 mini-css-extract-plugin（一般性压缩）
// 首先我们的 CSS 文件应该是导出到单独的 CSS 文件中，而不要直接打包到 JavaScript 文件中，然后通过style-loader的 addStyles方法添加进去，导出 CSS 文件/生产环境就需要使用mini-css-extract-plugin这个插件。

// 另外还可以在postcss-loader中配置配置cssnano插件进行更加彻底的压缩, 如下
// cssnano是基于 postcss 的一款功能强大的插件包，它集成了 30 多个插件，只需要执行一个命令，就可以对我们的 CSS 做多方面不同类型的优化，比如：

// 删除空格和最后一个分号；
// 删除注释；
// 优化字体权重；
// 丢弃重复的样式规则；
// 压缩选择器；
// 减少手写属性；
// 合并规则；

// cssnano 很智能，它能够将 CSS 规则相同的选择器进行合并，并且还能够将color进行任意的切换，这样的意义是为了缩短实际的字符串长度。
// 在webpack中, css-loader已经集成了cssnano, 而我们可以通过使用optimize-css-assets-webpack-plugin插件明确具体的cssnano的规则使用, 因为此插件默认使用的压缩工具/引擎就是cssnano.

// module three（图片）
// 图片资源优化
// 通常我们的代码体积会比图片体积小很多，有的时候整个页面的代码都不如一张头图大。好在图片资源不会阻塞浏览器渲染，但是不合理的图片大小也会消耗一定的代码(体积)。在之前章节中也已经提到使用：url-loader、svg-url-loader 和 image-webpack-loader 来优化图片，还介绍了使用雪碧图来优化图片资源。

// url-loader 可以按照配置将小于一定体积的静态文件内联进我们的应用。当我们指定了 limit 这个 options 选项，它会将文件编码成比无配置更小的 Base64 的数据 url 并将该 url 返回，这样可以将图片内联进 JavaScript 代码中，并节省一次 HTTP 请求。svg-url-loader 的工作原理类似于 url-loader，除了它利用 URL encoding 而不是 Base64 对文件编码，对于 SVG 图片来说，svg-url-loader 的这种方式这是有效的，因为 SVG 文件本质上是纯文本文件，这种 URL encoding 编码规模效应更加明显。

// 如果我们的项目中小图片特别多，例如有很多 icon 类的图标，这时候则推荐使用雪碧图（CSS Sprite）来合并这些小图到一张大图中，然后使用background-position来设置图片的位置，通过这样的方式可以节省多次小图片的请求。

// 对于大图片来说，可以使用image-webpack-loader来压缩图片，image-webpack-loader 它支持 JPG、PNG、GIF 和 SVG 格式的图片，因此我们在碰到所有这些类型的图片都会使用它。

// 总结：

// url-loader（小图）通过将低于一定大小的图片转为base64内联进代码减小代码体积的同时, 减少一次http请求。
// srg-url-loader（小图）通过url-encoding的方式压缩svg代码来达成可观的代码压缩规模效应。
// 大图则可以通过image-webpack-loader进行针对性压缩
  