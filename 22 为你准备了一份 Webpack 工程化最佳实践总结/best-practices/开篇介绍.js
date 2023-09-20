// 本小节将用小幅内容来总结下 Webpack 的最佳实践，让大家在实际项目中可以直接拿本篇文章的内容作为 CheckList 手册使用！

// 使用 NPM Scripts 来管理开发命令
// 使用 NPM Scripts 来配置开发命令，即package.json的scripts字段，这样即使我们修改脚本甚至切换 Webpack 到其他的打包工具，对于团队其他成员来说，使用的命令还是不变的，建议的命令包括：
// npm start：相当于npm run start，用于开发命令，快速启动本地开发服务；
// npm run build：用于生产环境打包；
// 其他命令，类似npm run test/lint 等，根据相关的需要添加即可
// 在package.json中使用cross-env来区分环境。
// 下面来看个示例：

// {
//     // ...
//     "scripts": {
//         "start": "cross-env NODE_ENV=development webpack --config webpack.config.dev.js --mode development",
//         "build": "cross-env NODE_ENV=production webpack --config webpack.config.prod.js --mode producation",
//         "analyzer": "cross-env NODE_ENV=production webpack --config webpack.config.analyzer.js --mode producation",
//         "lint": "lint-staged"
//     }
//     // ...
// }

// Webpack 区分多环境配置
// 区分生产环境和开发环境配置，并且封装通用配置，即将 Webpack 配置文件分为：

// 通用配置webpack.config.base.js;
// 开发环境配置webpack.config.dev.js;
// 生产环境配置webpack.config.prod.js;
// webpack.config.base.js
// 通用配置webpack.config.base.js用于通用的配置，例如 entry、loader 和 plugin 等，但是有些需要根据cross-env传入NODE_ENV环境变量进行相关的配置，例如：NODE_ENV=development的时候使用style-loader，而production的时候使用mini-css-extract-plugin的 loader 将生产环境的 CSS 生成单独的 CSS 文件；