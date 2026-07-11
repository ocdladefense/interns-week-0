const path = require('path');

module.exports = {
  // Webpack begins here and follows this file's imports.
  entry: './js/index.js',

  // Helpful source maps for debugging your original files.
  devtool: 'source-map',

  // The finished JavaScript bundle.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/dist/',
  },

  // Settings for `npm run dev`.
  devServer: {
    static: {
      directory: __dirname,
    },
    port: 8080,
    open: true,
    hot: false,
  },

  resolve: {
    extensions: ['.js'],
  },
};