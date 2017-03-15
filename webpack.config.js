const path = require('path')
const webpack = require('webpack')
var LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: ['./src/app'],
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  plugins: [new LiveReloadPlugin()]
}

