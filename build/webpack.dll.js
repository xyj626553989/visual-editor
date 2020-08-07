const path = require("path");
const { DllPlugin } = require("webpack");
const { library } = require("./dll.config");
const dllPath = path.join(__dirname, "../dll");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    mode: "production",
    entry: {
        ...library,
    },
    output: {
        path: dllPath,
        filename: "[name].[hash].dll.js",
        libraryTarget: "var", //用什么规范接受
        library: "_dll_[name]",
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: "**/*",
        }),
        new DllPlugin({
            name: "_dll_[name]",
            path: path.join(dllPath, "dll.[name].manifest.json"),
        }),
    ],
};
exports.dllPath = dllPath;
