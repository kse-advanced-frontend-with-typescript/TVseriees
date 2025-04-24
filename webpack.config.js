const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

const localEnv = dotenv.config().parsed;

module.exports = {
    entry: './src/index.tsx',
    devServer: {
        historyApiFallback: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.BASE_URL ?? '/',
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    transpileOnly: false, // Ensures type checking
                },
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: '[local]--[name]--[hash:base64:5]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
            'process.env.REST_API_KEY': localEnv.REST_API_KEY
                ? JSON.stringify(localEnv.REST_API_KEY)
                : JSON.stringify(process.env.REST_API_KEY),
            'process.env.API_KEY': localEnv.API_KEY
                ? JSON.stringify(localEnv.API_KEY)
                : JSON.stringify(process.env.API_KEY)
        })
    ]
};