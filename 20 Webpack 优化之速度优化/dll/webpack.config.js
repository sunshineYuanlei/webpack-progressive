const webpack = require('webpack');

module.exports = {
    output: {
        filename: '[name].[chunkhash].js'
    },
    entry: {
        app: './index.js'
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname, // process.cwd()
            // 这里导入 manifest配置内容
            manifest: require('./public/vendor/vendor-mainfest.json')
        })
    ]
};