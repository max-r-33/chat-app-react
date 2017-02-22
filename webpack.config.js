const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './js/app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }, {
                test: /\.css$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }, {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './src/dist'),
        filename: '[name].bundle.js'
    }
};
