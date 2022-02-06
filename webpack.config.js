const { VueLoaderPlugin } = require('vue-loader')
const path = require("path");

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  output: {
    filename: 'main.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@app': path.resolve(__dirname,'src')
    },
    extensions: ['', '.js', '.jsx'],
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
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
