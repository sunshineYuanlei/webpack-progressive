const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  mode: "production",
  // entry: {
  //     main: './default/index.js'
  // },
  entry: {
    a: "./default/a.js",
    b: "./default/b.js",
  },
  plugins: [new BundleAnalyzerPlugin()],
  optimization: {
    // splitChunks: {
    //   chunks: "async", // 三选一： "initial" | "all" | "async" (默认)
    //   minSize: 30000, // 最小尺寸，30K，development 下是10k，越大那么单个文件越小，，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再小也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了
    //   maxSize: 0, // 文件的最大尺寸，0为不限制，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize
    //   minChunks: 1, // 默认1，被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越少
    //   maxAsyncRequests: 5, // 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了
    //   maxInitialRequests: 3, // 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了
    //   automaticNameDelimiter: "~", // 打包文件名分隔符
    //   // name: true, // 拆分出来文件的名字，默认为 true，表示自动生成文件名，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/, // 正则规则，如果符合就提取 chunk
    //       priority: -10, // 缓存组优先级，当一个模块可能属于多个 chunkGroup，这里是优先级
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20, // 优先级
    //       reuseExistingChunk: true, // 如果该chunk包含的modules都已经另一个被分割的chunk中存在，那么直接引用已存在的chunk，不会再重新产生一个
    //     },
    //   },
    // },
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "foo",
          // chunks: "async", // 这里是我们修改的地方，async|initial|all
          // chunks: "initial",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
}

// 前言：
// 在 Webpack4 之前，我们处理公共模块的方式都是使用 CommonsChunkPlugin，然后该插件让开发配置繁琐，并且使公共代码的抽离不够彻底和细致，因此新的splitChunks改进了这些能力，不过虽然splitChunks相对 CommonsChunkPlugin 进步不少，但是 splitChunks 的配置却比较复杂。

// Webpack 代码拆分方式
// 在 Webpack 中，总共提供了三种方式来实现代码拆分（Code Splitting）：

// entry 配置：通过多个 entry 文件来实现；
// 动态加载（按需加载）：通过写代码时主动使用import()或者require.ensure来动态加载；
// 抽取公共代码：使用splitChunks配置来抽取公共代码。
// 这里我们主要讲的是通过splitChunks抽取公共代码。在讲解之前，再来复习下 Webpack 中三个重要的概念：module、chunks、bundle。

// module：就是 JavaScript 的模块，简单来说就是你通过 import、require 语句引入的代码，也包括 css、图片等资源；
// chunk：chunk 是 webpack 根据功能拆分出来的，chunk 包含着 module，可能是一对多也可能是一对一，chunk 包含三种情况，就是上面介绍的三种实现代码拆分的情况。
// bundle：bundle 是 webpack 打包之后的各个文件，一般就是和 chunk 是一对一的关系，bundle 就是对 chunk 进行编译压缩打包等处理之后的产出。
// 记住这些，后面会用到，下面开始 splitChunks 配置。

// Tips：拆分出来的文件名称可以通过output.chunkFilename来指定规则，例如chunkFilename='[name].js'，然后在对应的配置中配置name的具体值，比如 vendors 的 name 指定为foo：vendors.name='foo'
