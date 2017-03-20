const path = require('path');
const webpack = require('webpack');

function getDevTool() {
    return process.env.NODE_ENV !== 'production' ? 'source-map' : false;
}

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './js/client.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
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
    devtool: getDevTool(),
    output: {
        path: path.resolve(__dirname, './src/dist'),
        filename: '[name].bundle.js'
    }
};
