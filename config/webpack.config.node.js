/* global __dirname */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'), 
    filename: 'docile.node.js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                rootMode: 'upward'
              }
            }
        }
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, './src')
    ],
    extensions: ['.js', '.json']
  },

  optimization: {
    minimize: false,
  },

  context: path.resolve(__dirname, '..'),
  mode: 'production',

  plugins: []
};