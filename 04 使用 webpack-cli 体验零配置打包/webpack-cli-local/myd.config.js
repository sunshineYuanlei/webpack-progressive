const path = require('path'); // Node内置模块
 
module.exports = { 
  mode: "development",
  // 入口
  entry: './src/es/index.js',
  // 出口
  output: {
    // 因为这里需要绝对路径，__dirname获取到的是当前文件所在路径，所以拼接一下
    path: path.resolve(__dirname, './dist'), 
    // 打包后的js的文件名
    filename: 'boundle.js' 
  },
  // 配置模块
  module: {
    // 规则
    rules: [
      // {
      //   // 用正则表达式来进行匹配，匹配css文件
      //   test: /\.css$/, 
      //   // 使用的loader。注：这里执行顺序是从右往左走｜从下往上，先解析，再插入
      //   use: ['style-loader', 'css-loader'] 
      // }
      // js文件
{
  test: /\.js$/,
  use: [
    {
      // 使用loader
      loader: 'babel-loader',
      options: {
        // 使用的插件
        // plugins: ['@babel/plugin-transform-arrow-functions', '@babel/plugin-transform-block-scoping']
        presets: ['@babel/preset-env']
      }
    }
  ]
}
    ]
  }
};