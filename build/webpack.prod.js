const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
module.exports = (env, argv) => {
    console.log(env);
    const config = {
        mode: "production",
        devtool: false,
        optimization: {
            splitChunks: {
                chunks: "all", //默认作用于异步chunk，值为all/initial/async
                minSize: 30000, //默认值是30kb,代码块的最小尺寸
                minChunks: 1, //被多少模块共享,在分割之前模块的被引用次数
                maxAsyncRequests: 5, //按需加载最大并行请求数量
                maxInitialRequests: 3, //一个入口的最大并行请求数量
                name: true, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
                automaticNameDelimiter: "~", //默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
                cacheGroups: {
                    //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
                    react: {
                        chunks: "initial",
                        test: /[\\/]node_modules[\\/](react)|(react-dom)/,
                        priority: 1,
                        ///优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中,为了能够让自定义缓存组有更高的优先级(默认0),默认缓存组的priority属性为负值.
                    },
                    vendors: {
                        chunks: "initial",
                        test: /[\\/]node_modules[\\/]/, //条件
                        priority: -10, ///优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中,为了能够让自定义缓存组有更高的优先级(默认0),默认缓存组的priority属性为负值.
                    },
                    commons: {
                        chunks: "initial",
                        minSize: 0, //最小提取字节数
                        minChunks: 2, //最少被几个chunk引用
                        priority: -20,
                        reuseExistingChunk: true, //    如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
                    },
                },
            },
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true, //开启多进程并行压缩
                    cache: true, //开启缓存
                }),
                new OptimizeCSSAssetsPlugin(),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 2,
                            },
                        },
                        "postcss-loader",

                        "less-loader",
                    ],
                },

                {
                    test: /\.less$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                            },
                        },
                        {
                            loader: "css-loader",
                            options: { modules: true, importLoaders: 1 },
                        },
                        {
                            loader: "less-loader",
                            options: {
                                lessOptions: {
                                    modifyVars: {
                                        "primary-color": "#ff0000",
                                        "link-color": "#ff0000",
                                        "border-radius-base": "1px",
                                    },
                                    javascriptEnabled: true,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash].css",
                publicPath: "../",
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ["**/*"],
            }),
            new BundleAnalyzerPlugin(),
        ],
    };
    return merge(base, config);
};
