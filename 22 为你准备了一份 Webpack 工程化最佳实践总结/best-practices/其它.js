// 多页应用 Entry 和 HTML 管理
// 这个之前在 《Webpack 中打包 HTML 和多页面配置》中提到过最佳实践，想继续了解的可以点击链接复习一下。

// Cache之指定 chunk 的哈希（值）
// 在生产环境打包，一定要配置文件filename的hash，推荐hash配置规则如下：

// JavaScript 文件使用：[chunkhash]；
// CSS 文件使用：[contenthash]；
// 其他静态资源用：[hash]，例如图片、字体等，在url-loader中配置[hash]

// 语法层面的最佳实践
// 使用 ES6 Modules 语法，按需引入和合理导出，以保证 Tree-Shaking 效用最大化；
// 合理使用 Ployfill，推荐使用@babel/preset-env的useBuiltIns='usage'方案，这部分可以参考 Babel 部分的 Polyfill 配置介绍Polyfill 配置介绍；
// 合理使用 Webpack 的魔法注释（magic comments），增强缓存命中率和加载效率。比如：动态加载的模块要用webpackChunkName进行命名，还可以重要资源使用webpackPrefetch提前预加载；
// 使用合适的框架或者类库和合适的版本，举例说明：
// Lodash 使用lodash-es版本，并且按模块使用；
// Momentjs 使用 date-fns代替，并且按模块使用；
// 移动页面使用 Zepto 代替 jQuery；
// Vue、San、React 这类框架库根据实际情况选择合适构建版本，以 Vue 为例，其实构建版本包含浏览器版本、ESM 版本、UMD 版本、完整版等多个版本

// 其他 Webpack 配置的最佳实践
// 生产环境 -- 
// 生产环境使用mini-css-extract-plugin导出 CSS 文件；
// 生产环境使用压缩功能，包括 JavaScript、CSS、图片、SVG 等；

// 减少查找时间 --
// 合理配置查找路径，减少查找时间，比如设置 alias、添加项目路径、排查node_modules查找等；
// 在 rule 配置上，有test、include、exclude三个可以控制范围的配置，最佳实践是:
// 只在 test 和 文件名匹配 中使用正则表达式；
// 在 include 和 exclude 中使用绝对路径数组；
// 尽量避免 exclude，更倾向于使用 include。

// icon 类图片文件太多可以使用 CSS Sprite 来合并图片，防止设置url-loader和svg-url-loader的 limit 值不合理，导致 icon 文件都以 Base64 方式引入 CSS 文件中，导致 CSS 文件过大。