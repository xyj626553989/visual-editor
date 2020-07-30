
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: {
        main: path.join(__dirname, "../src/index.tsx")
    },
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname, "../dist"),
        chunkFilename: "[name].[chunkhash].js"
    },
    mode: "development",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../src/index.html")
        })
    ]
}