/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const packageLockJson = require('./package-lock.json');
const packageJson = require('./package.json');

const CopyWebpackPluginConfig = new CopyWebpackPlugin({ patterns: [{ from: 'src/assets', to: 'assets' }] });
const HtmlWebPackPluginConfig = new HtmlWebPackPlugin({
  template: './src/index.template.html',
  templateParameters: {
    description: packageJson.description,
    displayName: packageJson.displayName,
    packageVersions: JSON.stringify(Object.keys(packageLockJson.dependencies)
      .reduce((acc, key) => ({
        ...acc,
        [key]: {
          version: packageLockJson.dependencies[key].version,
          resolved: packageLockJson.dependencies[key].resolved,
        },
      }), { host: { version: packageJson.version } }), null, 2),
  },
  filename: './index.html',
  favicon: './src/assets/logo.svg',
});

const DefinePluginConfig = new webpack.DefinePlugin({
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
});

const WebpackPwaManifestConfig = new WebpackPwaManifest({
  name: packageJson.displayName,
  short_name: packageJson.name,
  description: packageJson.description,
  background_color: '#ffffff',
  crossorigin: 'use-credentials',
  icons: [],
});

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.[contenthash].js',
    publicPath: '/',
    globalObject: 'this',
  },
  devServer: {
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /\/node_modules/,
        use: { loader: 'awesome-typescript-loader' },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: 'ie 9' }],
          ],
        },
      },
      {
        test: /\.(woff2?|ttf|eot|svg|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(s?css)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'sass-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              precss,
              autoprefixer({
                browsers: ['> 1%', 'last 2 versions'],
              }),
            ],
          },
        },
        ],
      },
    ],
  },
  plugins: [
    CopyWebpackPluginConfig,
    HtmlWebPackPluginConfig,
    DefinePluginConfig,
    WebpackPwaManifestConfig,
  ],
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, 'src/@types'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: [
      path.resolve('node_modules'),
      path.resolve('src'),
    ],
  },
};
