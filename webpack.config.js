const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
    entry: {
        ".": path.resolve(__dirname, 'public/app/app.js'),
        "react": path.resolve(__dirname, 'public/react/jsx/app.jsx')
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name]/js/bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module : {
        rules : [
            {
                test: /\.jsx?$/,
                include :  path.resolve(__dirname, 'public'),
                loader: 'eslint-loader',
                enforce: 'pre'
            },
            {
                test : /\.jsx?$/,
                include :  path.resolve(__dirname, 'public'),
                loader : 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },
            {
                test: /\.svg$/,
                loader: 'babel-loader!svg-react-loader'
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