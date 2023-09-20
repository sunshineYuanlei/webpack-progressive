// 除了上面的三个配置文件之外，为了方便我们分析打包是否合理做了代码拆分，个配置实际是继承webpack.config.prod.js然后增加webpack-bundle-analyzer插件配置。
// 使用 webpack-merge 管理配置文件关系
// Webpack 配置文件拆分之后，各自之间都有依赖关系，具体关系如下：

// webpack.config.dev.js是合并了webpack.config.base.js和自己的配置；
// webpack.config.prod.js合并了webpack.config.base.js和自己的配置；
// webpack.config.analyzer.js合并了 webpack.config.prod.js和自己的配置，而webpack.config.prod.js又是来自于webpack.config.base.js。
// 要维护这个配置关系，那么就需要使用webpack-merge这个工具库，webpack-merge 主要是提供一个 Webpack 配置对象 Merge 函数，用来合并两个配置，类似于Object.assign函数的功能。

// 拿webpack.config.analyzer.js来看下webpack-merge怎么使用：

const merge = require('webpack-merge');
const prodWebpackConfig = require('./webpack.config.prod.js');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = merge(prodWebpackConfig, {
    // 增加 webpack-bundle-analyzer 配置
    plugins: [new BundleAnalyzerPlugin()]
});

 