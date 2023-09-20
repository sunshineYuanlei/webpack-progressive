module.exports = {
  entry: './app.js',
  mode: 'development',
  devtool: false,
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ]
        }
    ]
}
};

// Tips:
// 上面的webpack.config.js配置直接将 Babel 的配置写到了options中，还可以在项目根目录下创建.babelrc或者使用package.json的 babel 字段。