// ------------------
// @Table of Contents
// ------------------

/**
 * + @Loading Dependencies
 * + @Entry Point Setup
 * + @Path Resolving
 * + @Exporting Module
 */

// ---------------------
// @Loading Dependencies
// ---------------------

const path = require("path"),
  manifest = require("./manifest"),
  devServer = require("./devServer"),
  rules = require("./rules"),
  plugins = require("./plugins");

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// ------------------
// @Entry Point Setup
// ------------------

const entry = [
  path.join(manifest.paths.src, "assets", "scripts", manifest.entries.js),
];

// ---------------
// @Path Resolving
// ---------------

const resolve = {
  extensions: [".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
  modules: [
    path.join(__dirname, "../node_modules"),
    path.join(manifest.paths.src, ""),
  ],
};

// -----------------
// @Exporting Module
// -----------------

module.exports = {
  // enable development source maps
  // * will be overwritten by 'source-maps' in production mode
  devtool: manifest.IS_PRODUCTION ? false : "cheap-eval-source-map",
  // absolute path to the base directory
  context: path.join(manifest.paths.src, manifest.entries.js),
  watch: !manifest.IS_PRODUCTION,
  // entry files to compile (relative to the base dir)
  entry,
  output: {
    // base build directory
    path: manifest.paths.build,
    // path to build relative asset links
    publicPath: "",
    // bundle relative name
    filename: manifest.outputFiles.bundle,
  },
  // production mode optimization
  optimization: {
    minimizer: [
      // CSS optimizer
      new OptimizeCSSAssetsPlugin(),
      // JS optimizer by default
      new TerserPlugin(),
    ],
    //runtimeChunk: "single", // enable "runtime" chunk
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: manifest.outputFiles.vendor,
          chunks: "all",
        },
      },
    },
  },
  // custom loaders configuration
  module: {
    rules,
  },
  resolve,
  // plugins configurations
  plugins,
  // development server with hot-reload
  devServer,
};