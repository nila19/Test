const path = require('path');
// const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'public', 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'dist')
  }
};
