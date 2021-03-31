const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

require('dotenv').config();

function getPlugins () {
    return [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $     : 'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebpackPlugin({verbose: true}),
        new CopyPlugin({
            patterns: [
                {
                    from: __dirname + '/assets/img',
                    to  : path.join(__dirname, '..', 'public/img')
                },
                {
                    from: __dirname + '/favicon.ico',
                    to  : path.join(__dirname, '..', 'public')
                },
                {
                    from: __dirname + '/site.webmanifest',
                    to  : path.join(__dirname, '..', 'public')
                },
                {
                    from: __dirname + '/browserconfig.xml',
                    to  : path.join(__dirname, '..', 'public')
                }
            ]
        }, {
            copyUnmodified: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ];
}

module.exports = (mode, argv) => {
    const config = {
        entry: {
            app   : __dirname + '/index.js',
            styles: __dirname + '/scss/styles.scss'
        },
        output: {
            filename: 'js/[name].js',
            path    : path.resolve(__dirname, '../public')
        },
        module: {
            rules: [
                {
                    test   : /\.vue$/,
                    exclude: /node_modules/,
                    use    : 'vue-loader'
                },
                {
                    test: /\.scss$/,
                    use : [
                        MiniCssExtractPlugin.loader,
                        {loader: 'css-loader', options: {url: false, sourceMap: argv.mode === 'development'}},
                        {loader: 'postcss-loader', options: {sourceMap: argv.mode === 'development'}},
                        {loader: 'sass-loader', options: {sourceMap: argv.mode === 'development'}}
                    ]
                },
                {
                    test   : /\.js$/,
                    exclude: /node_modules/,
                    use    : {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.vue'],
            alias     : {
                '@': './'
            }
        },
        plugins: getPlugins(argv.mode)
    };

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};