// ------------------
// @Table of Contents
// ------------------

/**
 * + @Loading Dependencies
 * + @Environment Holders
 * + @Utils
 * + @App Paths
 * + @Output Files Names
 * + @Entries Files Names
 * + @Exporting Module
 */


// ---------------------
// @Loading Dependencies
// ---------------------

const path = require('path');


// --------------------
// @Environment Holders
// --------------------

const
  NODE_ENV       = process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT = NODE_ENV === 'development',
  IS_PRODUCTION  = NODE_ENV === 'production';


// ------
// @Utils
// ------

const
  dir = src => path.join(__dirname, src);


// ----------
// @App Paths
// ----------

const
  paths = {
    src   : dir('../src'),
    build : dir('../build'),
  };


// -------------------
// @Output Files Names
// -------------------

const
  outputFiles = {
    bundle : 'bundle.js',
    vendor : 'vendor.js',
    css    : 'style.css',
  };


// --------------------
// @Entries Files Names
// --------------------

const
  entries = {
    js   : 'index.js',
  };

  // --------------------
// @API URL
// --------------------

const API_ROOT_URL = "'http://192.168.29.192'" ;
//const API_ROOT_URL = "'http://localhost:8080'" ;

// -----------------
// @Exporting Module
// -----------------

module.exports = {
  paths,
  outputFiles,
  entries,
  NODE_ENV,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  API_ROOT_URL
};
