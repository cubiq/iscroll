'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {

  // config
  context: __dirname + '/src',
  entry: {
    build: './iscroll.js',
  },
  output: {
    path:       __dirname + '/dist',
    publicPath: '/',
    filename:   '[name].js'
  },

  // resolve settings
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js'],
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js'],
  },

  // plugins
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],

  // loaders
  module: {
    loaders: [
      {
        test:    /\.js$/,
        include: __dirname + '/src',
        loader:  'babel?presets[]=es2015',
      },
    ],
  },

  // devtools
  devtool: NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
  devServer: {
    contentBase: __dirname + '/dist',
  },
};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings:     false,
        drop_console: true,
        unsafe:       true,
      },
    })
  );
  module.exports.module.loaders[0].loader = 'strip?strip[]=debug!'+module.exports.module.loaders[0].loader;
}

