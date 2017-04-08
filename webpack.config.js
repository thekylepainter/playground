const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
    entry: {
        ".": path.resolve(__dirname, 'public/app/app.js'),
        "react": path.resolve(__dirname, 'public/react/jsx/todo/todo-app.jsx')
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name]/js/bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
            filename: '[name]/css/style.css',
            allChunks: true
        })
    ]
};

module.exports = config;