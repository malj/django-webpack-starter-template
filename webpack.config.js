const path = require('path')

module.exports = function (env = {production: false, analysis: false}) {
    /**
     * Webpack configuration
     * https://webpack.js.org/configuration/
     */
    const config = {}

    /**
     * Entry points for Webpack bundles
     * https://webpack.js.org/configuration/entry-context/#entry
     */
    config.entry = {
        commons: [
            // https://necolas.github.io/normalize.css/
            'normalize.css',

            // https://babeljs.io/docs/usage/polyfill/
            'babel-polyfill'
        ],
        main: path.join(__dirname, 'src')
    }

    /**
     * Output options for Webpack bundles
     * https://webpack.js.org/configuration/output/
     */
    config.output = {
        // https://webpack.js.org/configuration/output/#output-filename
        filename: '[name]-[hash].min.js',

        // https://webpack.js.org/configuration/output/#output-path
        path: path.join(__dirname, 'dist', 'webpack_bundles'),
    }

    if (!env.production) {
        // https://webpack.js.org/configuration/output/#output-publicpath
        config.output.publicPath = 'http://localhost:8080/'
    }

    /**
     * Options for resolving imports during Webpack build process
     * https://webpack.js.org/configuration/resolve/
     */
    config.resolve = {
        // https://webpack.js.org/configuration/resolve/#resolve-modules
        modules: [path.join(__dirname, 'src'), 'node_modules']
    }

    /**
     * Options for transforming imported modules during Webpack build process
     * https://webpack.js.org/configuration/module/
     */
    config.module = {
        // https://webpack.js.org/configuration/module/#module-noparse
        noParse: [/\.min\.w+$/],

        // https://webpack.js.org/configuration/module/#module-rules
        rules: []
    }

    /**
     * Rules for transforming script imports
     */
    config.module.rules.push({
        test: /\.js$/,
        exclude: /\/node_modules\//,
        use: [
            // https://webpack.js.org/loaders/babel-loader/
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        // https://babeljs.io/docs/plugins/preset-env/
                        ['env', {
                            // https://babeljs.io/docs/plugins/preset-env/#optionsmodules
                            // Required for unused code elimination:
                            // https://webpack.js.org/guides/tree-shaking/
                            modules: false,

                            // https://babeljs.io/docs/plugins/preset-env/#optionsuse-built-ins
                            useBuiltIns: true,

                            // https://babeljs.io/docs/plugins/preset-env/#optionsdebug
                            debug: env.analysis
                        }]
                    ],
                    plugins: [
                        // https://babeljs.io/docs/plugins/transform-object-rest-spread/
                        ['transform-object-rest-spread', {useBuiltIns: true}]
                    ]
                }
            }
        ]
    })

    /**
     * Rules for transforming style imports
     */
    const ExtractTextPlugin = require('extract-text-webpack-plugin')
    const autoprefixer = require('autoprefixer')

    config.module.rules.push({
        test: /\.css$/,
        // https://webpack.js.org/plugins/extract-text-webpack-plugin/#-extract
        use: ExtractTextPlugin.extract({
            // https://webpack.js.org/loaders/style-loader/
            fallback: 'style-loader',
            use: [
                // https://webpack.js.org/loaders/css-loader/
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: !env.production
                    }
                }
            ]
        })
    },
    {
        test: /\.styl$/,
        // https://webpack.js.org/plugins/extract-text-webpack-plugin/#-extract
        use: ExtractTextPlugin.extract({
            // https://webpack.js.org/loaders/style-loader/
            fallback: 'style-loader',
            use: [
                // https://webpack.js.org/loaders/css-loader/
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: !env.production
                    }
                },

                // https://webpack.js.org/loaders/postcss-loader/
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: !env.production,
                        plugins: () => [autoprefixer]
                    }
                },

                // https://github.com/shama/stylus-loader#stylus-loader
                {
                    loader: 'stylus-loader',
                    options: {
                        sourceMap: !env.production
                    }
                }
            ]
        })
    })

    /**
     * Rules for transforming file imports (images, fonts)
     */
    config.module.rules.push({
        test: /\.(woff2?|ttf|eot|otf|svg)(\?.*)?$/i,
        use: [
            // https://webpack.js.org/loaders/file-loader/
            {
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash].[ext]'
                }
            }
        ]
    },
    {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        exclude: /\/fonts\//,
        use: [
            // https://webpack.js.org/loaders/file-loader/
            {
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash].[ext]'
                }
            },

            // https://github.com/tcoopman/image-webpack-loader#image-loader
            {
                loader: 'image-webpack-loader'
            }
        ]
    })

    /**
     * Options for customizing Webpack build process
     * https://webpack.js.org/configuration/plugins/
     */
    const webpack = require('webpack')
    const {CommonsChunkPlugin} = webpack.optimize
    const BundleTrackerPlugin = require('webpack-bundle-tracker')

    config.plugins = [
        // https://github.com/ezhome/webpack-bundle-tracker#webpack-bundle-tracker
        // Required for Django webpack loader:
        // https://github.com/ezhome/django-webpack-loader#assumptions
        new BundleTrackerPlugin({
            indent: '  '
        }),

        // https://webpack.js.org/plugins/extract-text-webpack-plugin/
        new ExtractTextPlugin({
            filename: '[name]-[hash].css',
            disable: !env.production
        }),

        // https://webpack.js.org/plugins/commons-chunk-plugin/
        new CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons-[hash].min.js'
        })
    ]

    if (env.analysis) {
        const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

        config.plugins.push(
            // https://github.com/th0r/webpack-bundle-analyzer#webpack-bundle-analyzer
            new BundleAnalyzerPlugin()
        )
    }

    if (env.production) {
        /**
         * Production plugins
         * https://webpack.js.org/guides/production/
         */
        const CleanPlugin = require('clean-webpack-plugin')
        const CompressionPlugin = require('compression-webpack-plugin')
        const {UglifyJsPlugin, ModuleConcatenationPlugin} = webpack.optimize

        config.plugins.push(
            // https://github.com/johnagan/clean-webpack-plugin#clean-for-webpack
            new CleanPlugin(['webpack_bundles'], {
                root: path.join(__dirname, 'dist'),
                verbose: true
            }),

            // https://webpack.js.org/plugins/compression-webpack-plugin/
            new CompressionPlugin(),

            // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
            new UglifyJsPlugin({
                comments: false
            }),

            // New in Webpack 3 (scope hoisting), yet undocumented
            // https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b#c11e
            new ModuleConcatenationPlugin()
        )
    }
    else {
        /**
         * Development plugins
         * https://webpack.js.org/guides/development/
         */
        const {HotModuleReplacementPlugin} = webpack

        config.plugins.push(
            // https://webpack.js.org/plugins/hot-module-replacement-plugin/
            new HotModuleReplacementPlugin()
        )

        /**
         * Options for Webpack dev server
         * https://webpack.js.org/configuration/dev-server/
         */
        config.devServer = {
            // https://webpack.js.org/configuration/dev-server/#devserver-hot
            hot: true,

            // https://webpack.js.org/configuration/dev-server/#devserver-contentbase
            contentBase: false,

            // https://webpack.js.org/configuration/dev-server/#devserver-headers-
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8000'
            }
        }

        /**
         * Livereload setup for Django templates
         * https://github.com/napcs/node-livereload#node-livereload
         */
        const livereload = require('livereload')
        const templates = path.join(__dirname, '**', 'templates', '*.html')

        livereload.createServer().watch(templates)
    }

    return config
}
