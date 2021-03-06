const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// options
const config = {
  env: process.env.NODE_ENV || 'development',
  paths: {
    root: __dirname,
    source: path.join(__dirname, 'app'),
    static: path.join(__dirname, 'static'),
    output: path.join(__dirname, 'dist'),
    publicPath: '',
    assets: 'assets',
    index: path.join(__dirname, 'dist/index.html')
  },
  server: {
    port: process.env.PORT || 1368
  },
  sourceMap: { js: true, css: true }
}

function assetPath (...paths) {
  return path.posix.join(config.paths.assets, ...paths)
}

function styleLoader (type) {
  if (config.env !== 'production') {
    return `style!${(type === 'css' ? '' : 'css!')}${type}`
  }
  return ExtractTextPlugin.extract({
    fallbackLoader: 'style',
    loader: (type === 'css' ? [] : ['css']).concat([
      {
        loader: type,
        options: {
          sourceMap: true
        }
      }
    ])
  })
}

module.exports = {
  context: config.paths.root,
  entry: [path.join(config.paths.source, 'main.js')],
  output: {
    path: config.paths.output,
    publicPath: config.paths.publicPath,
    filename: assetPath('js', '[name].js?v=[hash:6]')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint',
        exclude: /node_modules/,
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'eslint',
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          loaders: {
            css: styleLoader('css'),
            less: styleLoader('less')
          }
        }
      },
      {
        test: /\.css$/,
        loader: styleLoader('css')
      },
      {
        test: /\.less$/,
        loader: styleLoader('less')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 10000,
          name: assetPath('img', '[name].[ext]?v=[hash:6]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 10000,
          name: assetPath('font', '[name].[ext]?v=[hash:6]')
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules', config.paths.source],
    extensions: ['.js', '.json', '.vue', '.css', '.less', '.sass'],
    alias: {
      // $: only module name
      // // runtime-only build, template option is not available.
      // 'vue$': 'vue/dist/vue.common'
      'vue$': 'vue/dist/vue'
    }
  },
  devServer: {
    port: config.server.port,
    outputPath: config.paths.output,
    contentBase: config.paths.output,
    historyApiFallback: true,
    // // no default console
    // noInfo: true,
    // quiet: true,
    inline: true,
    hot: true
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(config.env) }
    }),
    new HtmlWebpackPlugin({
      title: 'WEDN.NET',
      filename: config.paths.index,
      template: path.join(config.paths.source, 'index.ejs')
    }),
    new CopyWebpackPlugin([
      // {output}/file.txt
      { from: config.paths.static, context: __dirname }
    ])
  ]
}

if (config.env === 'production') {
  module.exports.devtool = 'source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new ExtractTextPlugin(assetPath('css', '[name].css?v=[hash:6]')),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
