const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const { DllReferencePlugin } = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const { library } = require("./dll.config");
const dllPath = path.join(__dirname, "../dll");
module.exports = {
    entry: {
        main: path.join(__dirname, "../src/index.tsx"),
    },
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname, "../dist"),
        chunkFilename: "[name].[chunkhash].js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [path.join(__dirname, "../node_modules")],
        alias: {
            "@": path.join(__dirname, "../src"),
        },
    },

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(j|t)sx?$/,
                use: [
                    "cache-loader",
                    {
                        loader: "thread-loader",
                        options: {
                            workers: 3,
                        },
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../src/public/index.html"),
            filename: "index.html",
            minify: !process.env.NODE_ENV === "production" && {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            },
        }),
        new webpack.IgnorePlugin(/^\.\/locale/, /moment$/),
        new HardSourceWebpackPlugin(),
        ...Object.keys(library).map(
            (name) =>
                new DllReferencePlugin({
                    manifest: require(path.join(
                        dllPath,
                        `dll.${name}.manifest.json`
                    )),
                })
        ),
        new AddAssetHtmlPlugin({
            filepath: path.join(dllPath, "*.dll.js"),
        }),
    ],
};
