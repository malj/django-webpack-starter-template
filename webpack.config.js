const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleTrackerPlugin = require('webpack-bundle-tracker')
const CleanupPlugin = require('webpack-cleanup-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const autoprefixer = require('autoprefixer')
const livereload = require('livereload')

module.exports = (env = 'development') => {
    /**
     * https://webpack.js.org/loaders/babel-loader/
     */
    const babelLoader = {
        loader: 'babel-loader',
        options: {
            presets: [
                // https://babeljs.io/docs/plugins/preset-env/
                ['env', {
                    modules: false,
                    useBuiltIns: true,
                    debug: env === 'analysis'
                }]
            ],
            plugins: [
                // https://babeljs.io/docs/plugins/transform-object-rest-spread/
                ['transform-object-rest-spread', {
                    useBuiltIns: true
                }]
            ]
        }
    }

    /**
     * https://webpack.js.org/loaders/style-loader/
     */
    const styleLoader = {
        loader: 'style-loader'
    }

    /**
     * https://webpack.js.org/loaders/css-loader/
     */
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: env === 'development'
        }
    }

    /**
     * https://webpack.js.org/loaders/postcss-loader/
     */
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: env === 'development',
            plugins: () => [autoprefixer]
        }
    }

    /**
     * https://github.com/shama/stylus-loader
     */
    const stylusLoader = {
        loader: 'stylus-loader',
        options: {
            sourceMap: env === 'development'
        }
    }

    /**
     * https://webpack.js.org/loaders/file-loader/
     */
    const fileLoader = {
        loader: 'file-loader',
        options: {
            name: '[name]-[hash].[ext]'
        }
    }

    /**
     * https://webpack.js.org/configuration/
     */
    const baseConfiguration = {
        /**
         * https://webpack.js.org/configuration/entry-context/#entry
         */
        entry: {
            commons: [
                // https://necolas.github.io/normalize.css/
                'normalize.css',

                // https://babeljs.io/docs/usage/polyfill/
                'babel-polyfill'
            ],
            main: path.join(__dirname, 'src')
        },

        /**
         * https://webpack.js.org/configuration/output/
         */
        output: {
            filename: '[name]-[hash].min.js',
            path: path.join(__dirname, 'dist', 'webpack_bundles'),
        },

        /**
         * https://webpack.js.org/configuration/resolve/
         */
        resolve: {
            modules: [__dirname, 'node_modules']
        },

        /**
         * https://webpack.js.org/configuration/module/
         */
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: babelLoader
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: styleLoader,
                        use: cssLoader
                    })
                },
                {
                    test: /\.styl$/,
                    use: ExtractTextPlugin.extract({
                        fallback: styleLoader,
                        use: [cssLoader, postcssLoader, stylusLoader]
                    })
                },
                {
                    test: /\.(png|jpe?g|gif|ico|svg|woff2?|ttf|eot|otf)$/,
                    use: fileLoader
                }
            ]
        },

        /**
         * https://webpack.js.org/configuration/plugins/
         */
        plugins: [
            // https://webpack.js.org/plugins/commons-chunk-plugin/
            new webpack.optimize.CommonsChunkPlugin({
                name: 'commons',
                filename: 'commons-[hash].min.js'
            }),

            // https://webpack.js.org/plugins/extract-text-webpack-plugin/
            new ExtractTextPlugin({
                filename: '[name]-[hash].css',
                disable: env === 'development'
            }),

            // https://github.com/ezhome/webpack-bundle-tracker#webpack-bundle-tracker
            // Required for Django Webpack Loader: https://github.com/ezhome/django-webpack-loader#assumptions
            new BundleTrackerPlugin({
                indent: '  '
            })
        ]
    }

    /**
     * https://webpack.js.org/guides/development/
     */
    const developmentConfiguration = {
        ...baseConfiguration,

        /**
         * https://webpack.js.org/configuration/output/
         */
        output: {
            ...baseConfiguration.output,
            publicPath: 'http://localhost:8080/',
            pathinfo: true
        },

        /**
         * https://webpack.js.org/configuration/plugins/
         */
        plugins: [
            ...baseConfiguration.plugins,

            // https://webpack.js.org/plugins/hot-module-replacement-plugin/
            new webpack.HotModuleReplacementPlugin()
        ],

        /**
         * https://webpack.js.org/configuration/devtool/
         */
        devtool: 'cheap-module-eval-source-map',

        /**
         * https://webpack.js.org/configuration/dev-server/
         */
        devServer: {
            hot: true,
            contentBase: false,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8000'
            }
        }
    }

    /**
     * https://webpack.js.org/guides/production/
     */
    const productionConfiguration = {
        ...baseConfiguration,

        /**
         * https://webpack.js.org/configuration/plugins/
         */
        plugins: [
            ...baseConfiguration.plugins,

            // https://webpack.js.org/plugins/define-plugin/
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),

            // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
            new webpack.optimize.UglifyJsPlugin({
                comments: false
            }),

            // https://webpack.js.org/plugins/module-concatenation-plugin/
            new webpack.optimize.ModuleConcatenationPlugin(),

            // https://webpack.js.org/plugins/compression-webpack-plugin/
            new CompressionPlugin(),

            // https://github.com/gpbl/webpack-cleanup-plugin
            new CleanupPlugin()
        ]
    }

    const analysisConfiguration = {
        ...productionConfiguration,

        /**
         * https://webpack.js.org/configuration/plugins/
         */
        plugins: [
            ...productionConfiguration.plugins,

            // https://github.com/webpack-contrib/webpack-bundle-analyzer
            new BundleAnalyzerPlugin()
        ]
    }

    switch (env) {
        case 'production':
            return productionConfiguration

        case 'development':
            livereload.createServer().watch(
                // Django templates
                path.join(__dirname, '**', 'templates', '**', '*.html')
            )
            return developmentConfiguration

        case 'analysis':
            return analysisConfiguration

        default:
            throw new TypeError(`Invalid Webpack environment ${env}`)
    }
}
