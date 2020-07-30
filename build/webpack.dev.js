const { merge } = require("webpack-merge")
const path = require("path")
const base = require("./webpack.base")

module.exports = (env, argv) => {
    const config = {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname, "../dist"),
            port: 3000
        }
    }
    return merge(base, config)
}