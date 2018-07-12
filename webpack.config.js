const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const BundleTrackerPlugin = require('webpack-bundle-tracker')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CleanupPlugin = require('webpack-cleanup-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { HotModuleReplacementPlugin } = require('webpack')
const livereload = require('livereload')

module.exports = (env = 'development') => {

    const DEBUG = env === 'development'

    const baseConfig = {
        entry: {
            commons: [
                'normalize.css',
                'babel-polyfill'
            ],
            main: path.join(__dirname, 'src')
        },
        output: {
            filename: '[name]-[hash].min.js',
            path: path.join(__dirname, 'dist', 'webpack_bundles'),
        },
        resolve: {
            modules: [path.join(__dirname, 'src'), 'node_modules']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /\/node_modules\//,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env'
                                ],
                                plugins: [
                                    '@babel/plugin-proposal-class-properties',
                                    '@babel/plugin-proposal-object-rest-spread'
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        DEBUG ? 'style-loader' : MiniCSSExtractPlugin.loader, 'css-loader'
                    ]
                },
                {
                    test: /\.styl$/,
                    use: [
                        DEBUG ? 'style-loader': MiniCSSExtractPlugin.loader,
                        'css-loader',
                        {loader: 'postcss-loader', options: {plugins: () => [autoprefixer]}},
                        'stylus-loader'
                    ]
                },
                {
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
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                disable: DEBUG
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new BundleTrackerPlugin({
                indent: '  '
            }),
        ]
    }

    const productionConfig = {
        ...baseConfig,
        mode: 'production',
        plugins: [
            ...baseConfig.plugins,
            new MiniCSSExtractPlugin({
                filename: '[name]-[hash].min.css',
                chunkFilename: '[id]-[hash].min.css'
            }),
            new OptimizeCSSAssetsPlugin(),
            new CleanupPlugin(),
            new CompressionPlugin()
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        test: /\.js$/,
                        chunks: 'initial',
                        minChunks: 2
                    }
                }
            }
        }
    }

    const developmentConfig = {
        ...baseConfig,
        mode: 'development',
        output: {
            ...baseConfig.output,
            publicPath: 'http://localhost:8080/'
        },
        plugins: [
            ...baseConfig.plugins,
            new HotModuleReplacementPlugin()
        ],
        devServer: {
            hot: true,
            contentBase: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    const analysisConfig = {
        ...productionConfig,
        plugins: [
            ...productionConfig.plugins,
            new BundleAnalyzerPlugin()
        ]
    }

    switch (env) {
        case 'production':
            return productionConfig

        case 'analysis':
            return analysisConfig

        default:
            livereload.createServer().watch(
                // Django templates
                path.join(__dirname, '**', 'templates', '**', '*.html')
            )
            return developmentConfig
    }
}
