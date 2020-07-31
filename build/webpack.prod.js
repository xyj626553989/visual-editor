const { merge } = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = (env, argv) => {
  console.log(env)
  const config = {
    mode: 'production',
    devtool: false,
    optimization: {
      splitChunks: {
        chunks: 'all', //异步代码分割
        minSize: 30000, //超过30k抽离
        maxSize: 0,
        minChunks: 1, //最少模块引用一次
        maxAsyncRequests: 5,
        maxInitialRequests: 3, //首屏最多3个
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 30, //最长名字大小
        name: true,
        cacheGroups: {
          //缓存组
          react: {
            test: /[\\/]node_modules[\\/](react)|(react-dom)/,
            priority: 1,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
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
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
              },
            },
            {
              loader: 'css-loader',
              options: { modules: true, importLoaders: 1 },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: {
                    'primary-color': '#ff0000',
                    'link-color': '#ff0000',
                    'border-radius-base': '1px',
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
        filename: '[name].[contenthash].css',
        publicPath: '../',
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: '**/*',
      }),
    ],
  }
  return merge(base, config)
}
