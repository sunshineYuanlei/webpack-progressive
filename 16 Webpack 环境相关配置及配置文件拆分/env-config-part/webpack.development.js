// 使用的时候，直接调用对应的方法即可：
const partsConfig = require('./webpack.parts.js');
 

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: partsConfig.getDevServer(),
  modules: {
      rules: [
          partsConfig.getCssLoader(),
          partsConfig.getUrlLoader({test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/, dir: 'img'})
      ]
  }
};

