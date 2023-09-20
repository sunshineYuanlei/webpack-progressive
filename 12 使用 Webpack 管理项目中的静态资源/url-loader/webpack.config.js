const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        publicPath: 'http://bd.bxstatic.com/img/'
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 3e3
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets')
        }
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        })
    ]
};

// Tips:
// 在 HTML 和 CSS 使用alias必须要前面添加~
// HTML 中使用<img>引入图片等静态资源的时候，需要添加html-loader配置，不然也不会处理静态资源的路径问题。
// 另外img-webpack-loader默认的配置就已经适用于日常开发图片的压缩优化需求了，但是如果你想更进一步去配置它，参考插件选项。要选择指定选项，请查看国外牛人写的一个图像优化指南。

// 关于数据
// 如果我们项目需要加载的类似 JSON、CSV、TSV 和 XML 等数据，那么我们需要单独给它们配置相应的 loader。对 JSON 的支持实际上是内置的，类似于 Node.js，这意味着import Data from'./data.json'导入数据默认情况将起作用。要导入 CSV，TSV 和 XML，可以使用csv-loader和xml-loader。
//  {
//     test: /\.(csv|tsv)$/,
//     use: [
//     'csv-loader'
//     ]
// },
// {
//     test: /\.xml$/,
//     use: [
//     'xml-loader'
//     ]
// }

// 当项目足够大了之后，配置太多的静态资源处理流程也会影响 Webpack 的打包速度，想突破压缩和合并这类前端常见优化，我们可以通过让视觉人员提供最优图片格式等方式来人工解决。当然如果项目组一直没有优化的意识，担心一不小心上到线上一个很大的图片，那么使用 Webpack 来兜底也是个很不错的方案。

