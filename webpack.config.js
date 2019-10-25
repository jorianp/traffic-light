const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
module.exports = {
    entry: { 
        main: './src/index.js' 
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {loader: "babel-loader"},
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1, sourceMap: true}
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
          })
    ]
}