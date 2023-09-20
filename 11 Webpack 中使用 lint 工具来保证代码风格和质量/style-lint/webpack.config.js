const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new StyleLintPlugin(options)]
  // ...
};
 

// Tips:
// 在 stylelint-webpack-plugin 插件中有两个跟 Webpack 编译相关的配置项：

// emitErrors：默认是true，将遇见的错误信息发送给 webpack 的编辑器处理；
// failOnError：默认是false，如果是 true遇见 StyleLint 报错则终止 Webpack 编译。

// failOnError这个比较有用, 可以节省编译时间, 可以适时处理下

// Tips-all:
// 本小节主要介绍了 Webpack 中结合 ESLint 和 StyleLint 对 JavaScript 和 CSS 文件进行代码风格检测。结合 eslint-loader 和 stylelint-webpack-plugin 可以在 Webpack 编译的过程中检测出代码中不符合规范的部分，提醒开发者及时修改代码。Webpack 项目中配置 ESLint 和 StyleLint 可以提高项目的可维护性，保持团队代码风格统一。