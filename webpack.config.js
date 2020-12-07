var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = {
    entry: './src/scripts/index.js',
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: './dist',
        hot: true,
        // proxy: {
        //   '/api': 'http://localhost:3000'
        // }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        })
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'style-loader', // creates style nodes from JS strings
                'css-loader', // translates CSS into CommonJS
                'sass-loader' // compiles Sass to CSS, using Node Sass by default
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader', // creates style nodes from JS strings
                'css-loader' // translates CSS into CommonJS
            ]
        },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }]
    },
    resolve: { alias: { vue: 'vue/dist/vue.esm.js' } }
};
