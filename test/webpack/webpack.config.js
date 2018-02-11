var path = require('path');

module.exports = {
  entry: './pre.js',
  output: {
    path: path.resolve(__dirname), 
    filename: 'post.js',
    libraryTarget: 'umd'
  },
  context: __dirname,
  target: 'web'
};