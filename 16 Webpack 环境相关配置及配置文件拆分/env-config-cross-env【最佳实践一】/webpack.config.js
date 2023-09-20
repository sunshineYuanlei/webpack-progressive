const baseWebpackConfig = require('./webpack.base.js');
const devWebpackConfig = require('./webpack.development.js');
const productionWebpackConfig = require('./webpack.production.js');
const merge = require('webpack-merge');
module.exports = merge(baseWebpackConfig, process.env.NODE_ENV === 'production' ? productionWebpackConfig : devWebpackConfig);