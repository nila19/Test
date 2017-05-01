
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: path.resolve(__dirname, 'public', 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}

