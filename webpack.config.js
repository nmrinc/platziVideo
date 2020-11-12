const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
//@o Shortcut to config dotenv.
require('dotenv-flow').config();

//@o With a const validate if the env is dev.
const isDev = (process.env.ENV === 'development');

//@o Define an entry for production
let entry = ['./src/frontend/index.js'];

//@o If isDev push the development entry.
if (isDev) entry = ['react-hot-loader/patch', ...entry, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'];

module.exports = {
  entry,
  mode: process.env.ENV,
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
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
            name: '[contenthash].[ext]',
            outputPath: 'assets/img',
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
    isDev ? new webpack.HotModuleReplacementPlugin() : () => {},
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
  ],
};
