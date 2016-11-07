'use strict';
const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const wp = require('./lib/wp-helper');

const TARGET = process.env.npm_lifecycle_event;
const ENABLE_POLLING = process.env.ENABLE_POLLING;
const PATHS = {
  app: path.join(__dirname, 'app'),
  style: [
    path.join(__dirname, 'app', 'styles', 'core.scss'),
  ],
  images: [
    path.join(__dirname, 'app', 'images')
  ],
  build: path.join(__dirname, 'dist')
};

process.env.BABEL_ENV = TARGET;

const common = merge(
  {
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  wp.indexTemplate({
    template: 'app/index.html',
    filename: 'index.html'
  }),
  wp.setAliases(),
  wp.loadFonts(),
  wp.loadImages(PATHS.images),
  wp.loadJSX(PATHS.app)
);

var config;

switch(TARGET) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        entry: {
          style: PATHS.style
        },
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      wp.loadConfig(path.join(__dirname, 'config', 'prod')),
      wp.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      wp.extractBundle({
        name: 'vendor',
        entries: ['react', 'react-dom']
      }),
      wp.minify(),
      wp.extractCSS(PATHS.style)
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
        entry: {
          style: PATHS.style
        }
      },
      wp.loadConfig(path.join(__dirname, 'config', 'dev')),
      wp.setupCSS(PATHS.style),
      wp.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
        poll: ENABLE_POLLING
      })
    );
}

module.exports = validate(config, {
  quiet: true
});
