const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

exports.indexTemplate = function(options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: options.template,
        filename: options.filename
      })
    ]
  };
}

exports.loadJSX = function(include) {
  return {
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loaders: ['babel?cacheDirectory=.babel-cache'],
          include: include
        }
      ]
    }
  };
}

exports.loadFonts = function() {
  return {
    module: {
      loaders: [
        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          loader: 'file'
        }
      ]
    }
  };
}

exports.setAliases = function() {
  return {
    resolve: {
      alias: {
        components: path.join(__dirname, '..', 'app', 'components'),
        containers: path.join(__dirname, '..', 'app', 'containers'),
        styles: path.join(__dirname, '..', 'app', 'styles'),
        images: path.join(__dirname, '..', 'app', 'images'),
        reducers: path.join(__dirname, '..', 'app', 'reducers'),
        actions: path.join(__dirname, '..', 'app', 'actions')
      }
    }
  }
}

exports.loadConfig = function(configFile) {
  return {
    resolve: {
      alias: {
        config: configFile
      }
    }
  }
}

exports.loadImages = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.(jpg|png)$/,
          loader: 'file?name=[path][name].[hash].[ext]',
          include: paths
        }
      ]
    }
  };
}

exports.devServer = function(options) {
  const ret = {
    devServer: {
      historyApiFallback: true,

      hot: true,
      inline: true,

      stats: 'errors-only',

      host: options.host,
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ],
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };

  return ret;
}

exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass'],
          include: paths
        }
      ]
    }
  };
}

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest'],
        minChunks: Infinity
      })
    ]
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
}

exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
          include: paths
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}
