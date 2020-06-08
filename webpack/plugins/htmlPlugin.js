const
  path              = require('path'),
  manifest          = require('../manifest'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const titles = {
  'index': 'Dashboard',
  'blank': 'Blank',
  'buttons': 'Buttons',
//  'calendar': 'Calendar',
//  'charts': 'Charts',
//  'chat': 'Chat',
//  'compose': 'Compose',
//  'datatable': 'Datatable',
  'email': 'Email',
  'forms': 'Forms',
  
  'settings-properties': 'Settings Properties',
  'settings-locale': 'Settings Locale',
  'settings-datasource': 'Settings DataSource',

  'security-perms': 'Roles & Permissions',
  'security-users': 'Users',
  'security-audit': 'Audit', 
  'resources-files':'Files',
  'resources-images':'Images',
//  'google-maps': 'Google Maps',
  'signin': 'Signin',
  'signup': 'Signup',
//  'ui': 'UI',
//  'vector-maps': 'Vector Maps',
  '404': '404',
//  '500': '500',
//  'basic-table': 'Basic Table',
};

/*
const globals = require("../../globals.js");

module.exports = Object.keys(titles).map(title => {
  return new HtmlWebpackPlugin({
    template: path.join(manifest.paths.src, `${title}.html`),
    path: manifest.paths.build,
    filename: `${title}.html`,
    inject: true,
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: false,
      removeComments: true,
      useShortDoctype: true,
    },
  });
});
*/

module.exports = Object.keys(titles).map(title => {
  return new HtmlWebpackPlugin({
    template: path.join(manifest.paths.src, `${title}.html`),
    path: manifest.paths.build,
    filename: `${title}.html`,
    title: titles[title],
    inject: true,
    templateParameters: {
      title: titles[title],
      API_ROOT_URL: manifest.API_ROOT_URL
    },
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    },
  });
});