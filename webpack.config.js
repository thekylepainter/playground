var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: {
        "js/bundle": path.resolve(__dirname, 'public/app/app.js'),
        "react/js/bundle": path.resolve(__dirname, 'public/react/jsx/index.jsx')
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js"
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include :  path.resolve(__dirname, 'public'),
                loader : 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '../css/style.css',
            allChunks: true
        })
    ]
};

module.exports = config;