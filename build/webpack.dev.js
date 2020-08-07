const { merge } = require("webpack-merge");
const path = require("path");
const base = require("./webpack.base");
const webpack = require("webpack");

module.exports = (env, argv) => {
    const config = {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname, "../dist"),
            port: 3000,
            // historyApiFallback: true,
            hot: true,
            before(app) {
                app.get("/api/user", function (req, res) {
                    setTimeout(() => {
                        res.json({
                            err: 0,
                            data: {
                                name: "熊永将",
                            },
                        });
                    }, 5000);
                });
            },
            // proxy: {
            //   "/api": {
            //     target: "http://localhost:3000",
            //     pathRewrite: {"^/api" : ""}
            //   }
            // }
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
                            options: { modules: true, importLoaders: 2 },
                        },
                        "postcss-loader",

                        "less-loader",
                    ],
                },
                {
                    test: /\.less$/,
                    // include: /node_modules/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            // options: { modules: true },
                        },
                        "postcss-loader",
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
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],
    };
    return merge(base, config);
};
