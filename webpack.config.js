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
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './src/dist'),
        filename: '[name].bundle.js'
    }
};
