const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')

module.exports = merge(common, {
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'src'),
    // inline: true,
    publicPath: '/dist/',
    historyApiFallback: true,
  },
})