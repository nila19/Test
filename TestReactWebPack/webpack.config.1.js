
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/tictactoe/tictactoe.html',
  filename: 'tictactoe.html',
  inject: 'body'
});

module.exports = {
  entry: path.resolve(__dirname, 'public', 'tictactoe', 'tictactoe.jsx'),
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'tictactoe.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}

