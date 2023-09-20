const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map'
};

// webpack.base.js是公共部分的配置，除了完全一致的内容之外，还可能会涉及到一些根据不同环境做的事情，比如 style-loader在开发环境用，而生产环境是用mini-css-extract-plugin的 loader，这时候需要使用环境变量来判断。

// 有两种方式来判断当前的环境变量：

// 1. 使用环境变量，例如 cross-env + NODE_ENV;
// 2. 使用 Webpack 配置文件的function 方式。

// Tips：这是因为我们所有的入口文件都是webpack.config.js。当然如果我们使用 Webpack 的时候，就已经在npm scripts里面区分了配置文件（webpack --config webpack.production.js），就不在讨论范围之内了。