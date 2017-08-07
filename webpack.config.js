(function() {
    'use strict';

    const path = require('path');
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    const isProduction = (process.env.NODE_ENV === 'production');
    console.log('Environment: ' + (isProduction ? 'production' : 'development'));

    module.exports = {
        entry: {
            'angular-tables-directives': './src/module.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].min.js' : '[name].js'
        },
        module: {
            // Add the babel-loader to the list of modules
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }]
        },
        resolve: {
            modules: [
                'node_modules',
                'bower_components'
            ],
            descriptionFiles: [
                'bower.json',
                'package.json'
            ],
            mainFields: [
                'module',
                'main'
            ]
        },
        devtool: isProduction ? undefined : '#cheap-source-map',
        plugins: []
    };

    // Uglyfy minimice for production
    if (isProduction) {
        module.exports.plugins.push(new UglifyJSPlugin({
            uglifyOptions: {
                ie8: true,
            }
        }));
    }
})();
