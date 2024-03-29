/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const MiniCss = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const WebpackBar = require('webpackbar')

const generateEntries = require('./generateEntries')
const generateHtmlTemplatePlugin = require('./generateHtmlTemplatePlugin')

const OUTPUT_PATH = path.resolve(__dirname, '../../../backend/client/public')

module.exports = (mode) => {
  const isDev = mode === 'development'

  return {
    mode,
    entry: generateEntries(),
    output: {
      filename: isDev
        ? 'static/js/main.[name].js'
        : 'static/js/main.[name].[chunkhash:6].bundle.js',
      chunkFilename: isDev
        ? 'static/js/chunk.[name].js'
        : 'static/js/chunk.[name].[chunkhash:6].js',
      path: OUTPUT_PATH,
      assetModuleFilename: 'static/assets/[hash][ext][query]',
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
      new MiniCss({
        filename: ({ chunk }) => {
          if (chunk.filenameTemplate) {
            return 'static/styles/style.[name].css'
          }
          return isDev
            ? 'static/styles/style.[name].css'
            : 'static/styles/style.[name].[chunkhash:6].min.css'
        },
        chunkFilename: () => {
          return isDev
            ? 'static/styles/style.chunk.[name].css'
            : 'static/styles/style.chunk.[name].[chunkhash:6].min.css'
        },
      }),
      new CopyPlugin({
        patterns: [path.resolve(__dirname, '../../public')],
      }),
      new WebpackBar({
        name: 'Keqing-site_FE',
        color: '#41b883',
        profile: true,
        reporter: {
          changeOverTime: true,
          done: () => console.log('🎉 My Awesome Build compiled successfully!'),
          allDone: () => console.log('🎉 All builds done!'),
        },
      }),
      ...generateHtmlTemplatePlugin(),
    ],
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader' },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCss.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
        {
          test: /\.html$/i,
          use: 'html-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg|jfif|mp3)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
          options: {
            inlineRequires: '/(img|audio)/',
            partialDirs: [path.resolve(__dirname, '../../src/shared/views')],
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../../tsconfig.json'),
        }),
      ],
      alias: {
        '@': path.resolve(__dirname, '../../'),
        '@Styles': path.resolve(__dirname, '../../src/shared/styles'),
        '@Shared': path.resolve(__dirname, '../../src/shared/js'),
        '@Lib': path.resolve(__dirname, '../../src/lib'),
        '@Util': path.resolve(__dirname, '../../src/shared/utils'),
        '@UI': path.resolve(__dirname, '../../src/lib/ui'),
        '@Public': path.resolve(__dirname, '../../src/shared/icons'),
      },
    },
  }
}
