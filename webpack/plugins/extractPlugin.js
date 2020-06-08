const
  manifest          = require('../manifest'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
// for webpack 3
module.exports = new ExtractTextPlugin({
  filename: manifest.outputFiles.css,
  allChunks: true,
});
*/

// for webpack 4
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = new MiniCssExtractPlugin({ filename: manifest.outputFiles.css, })


