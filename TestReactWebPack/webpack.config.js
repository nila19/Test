
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/filter/filter.html',
  filename: 'filter.html',
  inject: 'body'
});

module.exports = {
  entry: path.resolve(__dirname, 'public', 'filter', 'filter.jsx'),
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'filter.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}

