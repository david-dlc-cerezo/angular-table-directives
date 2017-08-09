(function() {
    'use strict';

    const path = require('path');
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    const isProduction = (process.env.NODE_ENV === 'production');
    console.log('Environment: ' + (isProduction ? 'production' : 'development'));

    const moduleConfig = {
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
    };

    const resolveConfig = {
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
    };

    const devtoolConfig = isProduction ? undefined : '#cheap-source-map';

    var pluginsConfig = [];
    if (isProduction) {
        pluginsConfig.push(new UglifyJSPlugin({
            uglifyOptions: {
                ie8: true,
            }
        }));
    }

    module.exports = [{
            entry: {
                'angular-tables-directives': './src/module.js',
            },
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: isProduction ? '[name].min.js' : '[name].js'
            },
            module: moduleConfig,
            resolve: resolveConfig,
            devtool: devtoolConfig,
            plugins: pluginsConfig
        },
        {
            entry: {
                'demo': './demo/scripts/app.js'
            },
            output: {
                path: path.resolve(__dirname, 'demo/scripts/bundle'),
                filename: '[name].js'
            },
            module: moduleConfig,
            resolve: resolveConfig,
            devtool: devtoolConfig,
            plugins: pluginsConfig
        }
    ];
})();
