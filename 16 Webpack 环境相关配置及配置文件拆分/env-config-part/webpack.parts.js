const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'
const getAssetPath = () => {}

// 获取 css-loader 配置
exports.getCssLoader = ({mode = 'development', test = /\.css$/, include = [], exclude = [], uses = []} = {}) => ({
    test,
    include,
    exclude,
    use: [
        {
            loader: mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
        },
        {
            loader: 'css-loader'
        }
    ].concat(uses)
});

// 获取 devServer 配置
exports.getDevServerConfig = ({host = '0.0.0.0', port = 8888} = {}) => ({
    host,
    port,
    stats: 'errors-only',
    open: true,
    overlay: true
});

// 获取 url-loader 配置
exports.getUrlLoader = ({test, largeAssetSize = 1000, assetsDir = path.join(__dirname, './assets'), dir} = {}) => ({
    test,
    use: {
        loader: 'url-loader',
        options: {
            limit: largeAssetSize,
            // 为啥要控制hash的长度?
            name: getAssetPath(assetsDir, `${dir}/[name]${isProduction ? '.[hash:8]' : ''}.[ext]`)
        }
    }
});

// 将零件配置进行拆分
// 除了按照开发环境拆分出development和production之外，我们还可以将公共的配置按照 loader、devServer 等相关配置拆到webpack.parts.js文件中，在其他项目直接组装想用的内容即可。
// 小结
// 在一个 Webpack 项目中，根据不同的使用环境合理划分 Webpack 的配置文件是很有必要的。本文介绍了如何按照开发环境和生产环境划分 Webpack 配置文件，并且介绍了公共配置部分拆分规则，可以使用 cross-env 模块来传入不同的环境变量，这样在公共配置文件内可以根据不同的环境变量进行配置。我们甚至可以将 Webpack 的配置拆成一个个的零件进行自由的搭配。