// wepback速度优化

// 考虑方向：
// 一. 从优化构建过程来考虑（从plugin和loader参与的构建过程来考虑）
// 二. 从压缩方面来考虑

// 优化构建过程：
// 1. Cache
// 2. 多线程
// 3. 预编译
// 4. 减少查找过程

// 下面一一介绍
// 减少查找过程/找得更快 👉
// ① 使用reasolve.alias减少查找/解析过程
// ② 使用resolve.extensions优先查找
// ③ 使用module.noParse排除不需要解析的模块
// ④ 使用test、include、exclude合理配置rule的查找范围/控制查找范围

// 其他构建过程的优化点
// sourceMap 生成耗时严重，根据之前 sourceMap[TODO](sourcemap 表格链接)表格选择合适的devtool值；
// 切换一些 loader 或者插件，比如：fast-sass-loader可以并行处理 sass 文件，要比 sass-loader 快 5~10 倍；

// 利用多线程提升构建速度
// 多线程打包有两种方案：thread-loader和HappyPack。

// 使用webpack.DLLPlugin来预先编译

// Cache：
// 使用babel-loader 配置cache（cacheDirectory）

// 在这里我们要做的事情是聚焦 Webpack 要处理的代码目录，帮助缩小 Webpack 的查找过程。

// 使用 resolve.alias减少查找过程
// resolve.alias 配置项通过别名（alias）来把原导入路径映射成一个新的导入路径。比如我们经常使用的 react 库，其实 react 库中有两套代码，一套是基于 CommonJs 的模块化代码，一套是打包好的完整代码，react.js 用于开发环境，react.min.js 用于生产环境。所以通过 resolve.alias 配置，可以让 Webpack 处理时，直接使用打包好的 react，从而跳过耗时的模块解析，还有我们项目中可能会有一些相对路径的写法，可以使用 alias 配置来减少查找过程，具体示例配置如下：

// module.exports = {
//   resolve: {
//     alias: {
//       // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，
//       // 减少耗时的递归解析操作
//       react: path.resolve(__dirname, "./node_modules/react/dist/react.min.js"),
//       // 减少相对路径的查找, 提高速度
//       "@lib": path.resolve(__dirname, "./src/lib/"),
//     },
//   },
// }

// 使用 resolve.extensions 优先查找
// 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试询问文件是否存在，查询的顺序是按照我们配置的resolve.extensions顺序从前到后查找，如果我们配置 resolve.extensions= ['js', 'json']，那么会先找xxx.js然后没有再查找xxx.json，所以我们应该把常用到的文件后缀写在前面，或者我们导入模块时，尽量带上文件后缀名。

// 排除不需要解析的模块
// module.noParse配置项可以让 Webpack 忽略对部分没采用模块化的文件递归解析处理，例如：jQuery、ChartJS，它们体积庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义，所以使用module.noParse排除它们。

// module.exports = {
//     module: {
//         noParse: /node_modules\/(jquey\.js)/;
//     }
// }
// Tips：被忽略掉的文件里不应该包含 import、require、define 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

// 合理配置 rule 的查找范围
// 在 rule 配置上，有test、include、exclude三个可以控制范围的配置，最佳实践是:

// 只在 test 和 文件名匹配中使用正则表达式；
// 在 include 和 exclude 中使用绝对路径数组；
// 尽量避免 exclude，更倾向于使用 include。
// 示例配置：

// rules: [
//     {
//         // test 使用正则
//         test: /\.js$/,
//         loader: 'babel-loader',
//         // 排除路径使用数组
//         exclude: [path.resolve(__dirname, './node_modules')],
//         // 查找路径使用数组
//         include: [path.resolve(__dirname, './src')]
//     }
// ];
// 预览
// Tips：exclude优先级要优于include和test，所以当三者配置有冲突时，exclude会优先于其他两个配置。

// 利用多线程提升构建速度
// 由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以 Webpack 需要处理的事情需要一件一件的做，不能多件事一起做。
// 我们需要 Webpack 能同一时间处理多个任务，发挥多核 CPU 电脑的威力，HappyPack 就能让 Webpack 做到这点，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
// 我们知道 Node.js 是单线程模型的，Webpack 运行在 Node.js 上处理事情是一件件处理的，我们可以通过插件方式让 Webpack 支持多个线程进行同时打包，以便提高编译打包的速度。但是需要注意的是，如果项目比较简单，没有必要采用这种方式，简单的项目使用多线程编译打包反而会因为多线程打包浪费更多的 CPU 资源，这样最终结果是不仅不能加快打包的速度，反而会降低打包的速度。

// 多线程打包有两种方案：thread-loader和HappyPack。

// thread-loader
// thread-loader 是针对 loader 进行优化的，它会将 loader 放置在一个 worker 池里面运行，以达到多线程构建。thread-loader 在使用的时候，需要将其放置在其他 loader 之前，如下面实例：

// // webpack.config.js

// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 include: path.resolve('src'),
//                 use: [
//                     'thread-loader'
//                     // 你的高开销的loader放置在此 (e.g babel-loader)
//                 ]
//             }
//         ]
//     }
// };

// HappyPack
// HappyPack 是通过多进程模型，来加速代码构建，具体的原理部分可以看它的介绍，里面有个详细的流程图，下面直接上它的示例代码：

// webpack.config.js
// const os = require('os');
// const HappyPack = require('happypack');
// 根据 cpu 数量创建线程池
// const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: 'happypack/loader?id=jsx'
//             },

//             {
//                 test: /\.less$/,
//                 use: 'happypack/loader?id=styles'
//             }
//         ]
//     },
//     plugins: [
//         new HappyPack({
//             id: 'jsx',
//             // 多少个线程
//             threads: happyThreadPool,
//             loaders: ['babel-loader']
//         }),

//         new HappyPack({
//             id: 'styles',
//             // 自定义线程数量
//             threads: 2,
//             loaders: ['style-loader', 'css-loader', 'less-loader']
//         })
//     ]
// };
// Tips：给 loader 配置使用 HappyPack 需要对应的 loader 支持才行，例如 url-loader 和 file-loader 就不支持 HappyPack，在 HappyPack 的 wiki 中有一份支持 loader 的列表。

// 使用 webpack.DllPlugin 来预先编译
// 预先编译和打包不会变动存在的文件，在业务代码中直接引入，加快 Webpack 编译打包的速度，但是并不能减少最后生成的代码体积。

// 例如下面代码：

// import React, {Component} from 'react';
// import ReactDOM, {render} from 'react-dom';
// 使用了 react 和 react-dom 两个库，这两个库一般我们日常业务代码开发的时候并不会升级版本或者修改内部代码，但是在每次构建的时候，这些代码都会重新编译和打包，这样就很浪费时间，webpack.DllPlugin就是来解决这个问题的插件，使用它可以在第一次编译打包后就生成一份不变的代码供其他模块引用，这样下一次构建的时候就可以节省开发时编译打包的时间。

// 要使用DllPlugin的功能，需要配合webpack.DllReferencePlugin来使用。

// DLLPlugin 这个插件是在一个额外独立的 Webpack 设置中创建一个只有公共库的 dll 文件，这时候我们项目中应该单独为 dll 文件创建一个配置文件，例如webpack.config.dll.js，webpack.config.dll.js 作用是把所有的第三方库依赖打包到一个 bundle 的 dll 文件里面，还会生成一个名为 manifest.json 文件。生成的 manifest.json 会让 DllReferencePlugin在webpack.config.js配置中映射到相关的依赖上去的。

// DllReferencePlugin 这个插件是在 webpack.config.js 中使用的，该插件的作用是把刚刚在 webpack.config.dll.js 中打包生成的 dll 文件引用到需要的预编译的依赖上来。什么意思呢？就是说，假设在 webpack.config.dll.js 中打包后会生成 dll.js 文件和 manifest.json两个文件，dll.js 文件包含所有的第三方库文件，manifest.json 文件会包含所有库代码的一个索引，当在使用 webpack.config.js 文件打包 DllReferencePlugin 插件的时候，会使用该 DllReferencePlugin 插件读取 vendor-manifest.json 文件，看看是否有该第三方库。manifest.json 文件就是有一个第三方库的一个映射而已。

// 当第一次使用 webpack.config.dll.js 文件会对第三方库打包，打包完成后就不会再打包它了，然后每次运行 webpack.config.js 文件的时候，都会打包项目中本身的文件代码，当需要使用第三方依赖的时候，会使用 DllReferencePlugin 插件去读取第三方依赖库，而只有我们修改第三方公共库的时候，才会执行webpack.config.dll.js。本质上来说 DLL 方案就是一种缓存机制。

// Tips：DLL 是动态链接库（Dynamic-link library）的英文缩写，最早是微软提出来的一种共享函数库概念，实际就是将一些经常会共享的代码制作成 DLL 文档，当其他代码需要使用这些 DLL 中的代码时，Windows 操作系统会将 DLL 文档加载到内存中。这里借用了 DLL 的概念，帮助 Webpack 使用者理解用途。

// 我们接下来看看具体怎么配置，首先我们的src/index.js按照正常代码写法即可，例如内容如下：

// import React, {Component} from 'react';
// import ReactDOM, {render} from 'react-dom';

// console.log(React, Component, ReactDOM, render, 'hell dll');
// 然后我们创建一个webpack.config.dll.js，这里面添加了我们需要打包的第三方依赖库 react 和 react-dom：

// // webpack.config.dll.js
// const webpack = require('webpack');
// // 这里是第三方依赖库
// const vendors = ['react', 'react-dom'];

// module.exports = {
//     mode: 'production',
//     entry: {
//         // 定义程序中打包公共文件的入口文件vendor.js
//         vendor: vendors
//     },
//     output: {
//         filename: '[name].[chunkhash].js',
//         // 这里是使用将 verdor 作为 library 导出，并且指定全局变量名字是[name]_[chunkhash]
//         library: '[name]_[chunkhash]'
//     },
//     plugins: [
//         new webpack.DllPlugin({
//             // 这里是设置 mainifest.json 路径
//             path: 'manifest.json',
//             name: '[name]_[chunkhash]',
//             context: __dirname
//         })
//     ]
// };
// 这时候执行webpack --config webpack.config.dll.js，显示打包成功：


// 查看一下目录结构如下：

// ├── dist
// │   └── vendor.1c25daba4f58872736ee.js # 这个是刚刚打包出来的 dll 文件
// ├── manifest.json    # 这个是配置文件，后续要用
// ├── node_modules
// ├── package.json
// ├── src
// │   └── index.js
// ├── webpack.config.dll.js # dll 配置
// └── webpack.config.js # 普通配置
// 下面我们来看下正常项目的配置文件webpack.config.js是怎么配置的，webpack.config.js中我们需要使用DllReferencePlugin指定manifest.json的内容即可：

// // webpack.config.js
// const webpack = require('webpack');

// module.exports = {
//     output: {
//         filename: '[name].[chunkhash].js'
//     },
//     entry: {
//         app: './src/index.js'
//     },
//     plugins: [
//         new webpack.DllReferencePlugin({
//             context: __dirname,
//             // 这里导入 manifest配置内容
//             manifest: require('./manifest.json')
//         })
//     ]
// };
// 这时候执行webpack命令就可以生成app.js文件了，并且app.js并不会包含 dll 打包出来的vendor.js文件内容，打包速度也提升了不少！

// Tips：在实际操作中，HTML 中不会主动引入 dll 的 vendor.js 文件，这时候需要我们想办法手动或者通过插件添加进去，比如使用add-asset-html-webpack-plugin，或者在 dll 打包的时候就修改一下 html-webpack-plugin 的 template 文件，正常打包的时候直接使用这个 template 文件再打包一次即可。