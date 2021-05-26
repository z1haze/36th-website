const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyPlugin = require('copy-webpack-plugin');

function getPlugins () {
    return [
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
            extensions: ['.js'],
            alias     : {
                '@': './'
            }
        },
    };

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};