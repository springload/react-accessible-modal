const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

config.watch = false;
config.devtool = false;
config.output.path = path.join(__dirname, '..', 'pages', 'assets');

config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true, // React doesn't support IE8
            warnings: false,
        },
        mangle: {
            screw_ie8: true,
        },
        output: {
            comments: false,
            screw_ie8: true,
        },
    }),
];

module.exports = config;
