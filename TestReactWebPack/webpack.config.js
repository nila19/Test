
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/src/app.html',
  filename: 'app.html',
  inject: 'body'
});

module.exports = {
  entry: path.resolve(__dirname, 'public', 'src', 'app.jsx'),
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}

