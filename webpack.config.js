const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_END === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ];
    }
    return config;
};

const getFileName = ext => (isProd ? '[name].[hash].' : '[name].') + ext;

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        }, 'css-loader'
    ];
    if (extra) {
        loaders.push(...extra);
    }
    return loaders;
};

const getJSBabelLoader = extraPresets => {
    const loader = {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties'
            ]
        }
    };
    if (extraPresets) {
        loader.options.presets.push(...extraPresets);
    }
    return loader;
};

const jsLoaders = () => {
    const loaders = [getJSBabelLoader()];
    if (isDev) {
        loaders.push('eslint-loader');
    }
    return loaders;
};

const getPlugins = () => {
    const plugins = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src', 'favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            },
            {
                from: path.resolve(__dirname, 'src', 'favicon.png'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: getFileName('css')
        })
    ]; 
    if (isProd) {
        plugins.push(new BundleAnalyzerPlugin());
    }
    return plugins;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        anal: './anal.ts'
    },
    output: {
        filename: getFileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.png', '.csv', '.xml'],
        alias: {
            '@models': path.resolve(__dirname, 'src', 'models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 3000,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: getPlugins(),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: getJSBabelLoader(['@babel/preset-typescript'])
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: getJSBabelLoader(['@babel/preset-react'])
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders(['less-loader'])
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders(['sass-loader'])
            },
            {
                test: /\.(png|jpe?g|svg|gif|bmp)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.csv$/,
                use: [
                    'csv-loader'
                ]
            }
        ]
    }
};