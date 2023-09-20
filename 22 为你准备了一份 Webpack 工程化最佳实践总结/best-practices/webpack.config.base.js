const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.css?$/,
                use: [
                    {
                        loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: !isProduction
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: !isProduction
                        }
                    }
                ]
            }
        ]
    }
    // ...
};