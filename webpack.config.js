const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', './src/frontend/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/app.js',
    publicPath: '/',
    hotUpdateChunkFilename: '.hot / [id].[fullhash].hot - update.js',
    hotUpdateMainFilename: '.hot / [fullhash].hot - update.json',

  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg|mp4|webm)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 90000,
            name: 'assets/img/[contenthash].[ext]',
          },
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    port: 3000,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
  ],
};
