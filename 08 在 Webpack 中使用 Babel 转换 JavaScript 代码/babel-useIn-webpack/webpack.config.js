module.exports = {
  entry: './babel.js',
  mode: 'development',
  devtool: false,
  module: {
      rules: [
          {
              test: /\.js$/,
              use: [
                  {
                      loader: 'babel-loader',
                      options: {
                          presets: [
                              [   
                                  // 转换es6为es5
                                  '@babel/preset-env',
                                  // 处理polyfille
                                  {
                                      useBuiltIns: 'usage'
                                  }
                              ]
                          ]
                      }
                  }
              ]
          }
      ]
  }
};

// Tips:
// 上面的webpack.config.js配置直接将 Babel 的配置写到了options中，还可以在项目根目录下创建.babelrc或者使用package.json的 babel 字段。