const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

require('dotenv').config();

function getPlugins () {
    return [
        new webpack.EnvironmentPlugin(['OAUTH_CLIENT_ID', 'OAUTH_REDIRECT_URL_LOGIN', 'OAUTH_REDIRECT_URL_JOIN']),
        new VueLoaderPlugin(),
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin({verbose: true}),

        new CopyPlugin({
            patterns: [
                {
                    from: __dirname + '/img',
                    to  : path.join(__dirname, '..', 'public/img')
                },
                {
                    from: __dirname + '/svg',
                    to  : path.join(__dirname, '..', 'public/svg')
                },
                {
                    from: __dirname + '/webfonts',
                    to  : path.join(__dirname, '..', 'public/webfonts')
                },
                {
                    from: __dirname + '/node_modules/@fortawesome/fontawesome-free/webfonts',
                    to  : path.join(__dirname, '..', 'public/webfonts')
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
            app: [__dirname + '/js/app.js', __dirname + '/scss/app.scss']
        },

        output: {
            filename: 'js/[name].js',
            path    : path.resolve(__dirname, '..', 'public')
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
                        { loader: 'css-loader', options: { url: false, sourceMap: argv.mode === 'development' } },
                        { loader: 'postcss-loader', options: { sourceMap: argv.mode === 'development' } },
                        { loader: 'sass-loader', options: { sourceMap: argv.mode === 'development' } }
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

        plugins: getPlugins(argv.mode),

        resolve: {
            extensions: ['.js', '.vue'],
            alias     : {
                'vue$': 'vue/dist/vue.esm.js',
                '@'   : './'
            }
        },
    };

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};