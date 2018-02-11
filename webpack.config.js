var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'docile.js',
    library: 'Docile',
    libraryTarget: 'window'
  },

  module: {
    rules: []
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json', '.jsx', '.css']
  },

  performance: {
    hints: 'warning', // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  context: __dirname,
  target: 'web',
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          passes: 3
        }
      }
    })
  ]
};