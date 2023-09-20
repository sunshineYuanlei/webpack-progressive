const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    hot: true,
    proxy: {
      "/api": {
        target: "https://baidu.com",
        secure: false, // 使用https
        pathRewrite: { "^/api": "" }, // 去掉路径中的 /api
        bypass(req, res, proxyOptions) {
          // 判断请求头中的 accept 值
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.")
            // 返回的是 contentBase 的路径
            return "/index.html"
          }
        },
        context: ["/auth", "/api"],
      },
    },
    // 原理上来说，webpack-dev-server 使用了 http-proxy-middleware中间件来实现的 proxy 功能，所以更多配置项及其实现可以直接参考 http-proxy-middleware的文档
    onBeforeSetupMiddleware(context, server) {
      const {app} = context
      console.log("app", app)
      app.get('/api/mock.json', (req, res) => {
          res.json({hello: 'leizi'});
      });
    },
    // 自定义中间件
    // 在 webpack-dev-server 中有两个时机可以插入自己实现的中间件，分别是在devServer.before和devServer.after两个时机，即 webpack-dev-server 加载所有内部中间件之前和之后两个时机。
    // 自定义中间件在开发中常常被用来当作 mock server 使用。
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "index.html",
      // inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

// Tips:
// 自动刷新
// 在开发中，我们希望边写代码，边看到代码的执行情况，webpack-dev-server 提供自动刷新页面的功能可以满足我们的需求。webpack-dev-server 支持两种模式的自动刷新页面。

// iframe 模式：页面被放到一个 iframe 内，当发生变化时，会重新加载；
// inline 模式：将 webpack-dev-server 的重载代码添加到产出的 bundle 中。
// 两种模式都支持模块热替换（Hot Module Replacement）。模块热替换的好处是只替换更新的部分，而不是整个页面都重新加载。

// 使用方式：webpack-dev-server --hot --inline是开启inline模式的自动刷新。

// 启动 devserver 是通过webpack-dev-server命令行来启动的，不是webpack命令，执行webpack时devServer内容会被忽略
// 在使用数组导出配置的方式时，只会使用第一个配置中的 devServer 选项，并将其用于数组中的其他所有配置。

// Webpack Dev Server 常用配置
// devServer.historyApiFallback：配置如果找不到页面就默认显示的页面；
// devServer.compress：启用 gzip 压缩；
// devServer.hotOnly：构建失败的时候是否不允许回退到使用刷新网页；
// devServer.inline：模式切换，默认为内联模式，使用false切换到 iframe 模式；
// devServer.open：启动后，是否自动使用浏览器打开首页；
// devServer.openPage：启动后，自动使用浏览器打开设置的页面；
// devServer.overlay：是否允许使用全屏覆盖的方式显示编译错误，默认不允许；
// devServer.port：监听端口号，默认 8080；
// devServer.host：指定 host，使用0.0.0.0可以让局域网内可访问；
// devServer.contentBase：告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要；
// devServer.publicPath：设置内存中的打包文件的虚拟路径映射，区别于output.publicPath；
// devServer.staticOptions：为 Expressjs 的 express.static配置参数，参考文档： http://expressjs.com/en/4x/api.html#express.static
// devServer.clientLogLevel：在 inline 模式下用于控制在浏览器中打印的 log 级别，如error, warning, info or none；
// devServer.quiet：静默模式，设置为true则不在控制台输出 log；
// devServer.noInfo：不输出启动 log；
// devServer.lazy: 不监听文件变化，而是当请求来的时候再重新编译；
// devServer.watchOptions：watch 相关配置，可以用于控制间隔多少秒检测文件的变化；
// devServer.headers：自定义请求头，例如自定义 userAgent 等；
// devServer.https：https 需要的证书签名等配置。
