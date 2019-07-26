/* global __dirname */
const path = require('path');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'), 
    filename: 'docile.js',
    library: 'Docile',
    libraryTarget: 'window'
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

  /*optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            reserved: ['Docile', 'DocileLink']
          }
        }
      })
    ]
  },*/

  context: path.resolve(__dirname, '..'),
  target: 'web',
  mode: 'production',

  plugins: []
};