const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = [
    {
        entry: './import-loader.js',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                }
            ]
        },
        plugins: [
            // 添加 plugin
            new MiniCssExtractPlugin({
                filename: 'no-import-loaders.css'
            })
        ]
    },
    {
        entry: './import-loader.js',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                }
            ]
        },
        plugins: [
            // 添加 plugin
            new MiniCssExtractPlugin({
                filename: 'with-import-loaders.css'
            })
        ]
    }
];

// Tips:
// 本小节主要介绍了 Webpack 中 CSS 相关的配置，主要内容包含：CSS Webpack 配置、CSS 预处理器配置和 PostCSS 配置。CSS 配置相对来说比较复杂，如果我们使用 CSS 的预处理器来编写代码，首先需要配置对应的预处理器 loader，将扩展的语法转成 CSS 代码，然后再配合 css-loader 和 style-loader。在生产环境推荐使用 mini-css-extract-plugin 将 CSS 内容导出到 CSS 文件来供页面单独引入。PostCSS 是一个强大的 CSS 后处理器，我们通过 PostCSS 的强大插件可以实现 CSS 前缀的自动添加（autoprefixer），还可以更加智能的实现 CSS 的压缩（cssnano）等功能。