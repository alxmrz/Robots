const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require("path");

module.exports = {
  entry: {
    main: './src/main.js'
  },
  mode: 'development',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname,'src')
    },
    extensions: ['', '.js', '.jsx', '.html'],
    modules: [
      'node_modules',
      'bower_components',
      'shared',
      '/shared/vendor/modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }),
    new HtmlWebpackPlugin({
      title: 'Robots city',
      template: "./public/index.html"
    }),
  ],
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: '/node_modules/'
  },
};
