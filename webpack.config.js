const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    filename: isDev ? 'assets/app.js' : 'assets/app-[contenthash].js',
    publicPath: '/',
    hotUpdateChunkFilename: '.hot / [id].[fullhash].hot - update.js',
    hotUpdateMainFilename: '.hot / [fullhash].hot - update.json',

  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    //@concept Vendor files
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: isDev ? 'assets/vendor.js' : 'assets/vendor-[contenthash].js',
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
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
            outputPath: 'assets',
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
    isDev ? new webpack.HotModuleReplacementPlugin() : () => { },
    isDev ? () => { } :
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        filename: '[path][base].gz',
      }),
    isDev ? () => { } :
      new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? 'assets/app.css' : 'assets/app-[contenthash].css',
    }),
    isDev ? () => { } :
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: path.resolve(__dirname, 'src/server/public'),
      }),
  ],
};
