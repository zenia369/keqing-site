const path = require('path')
const MiniCss = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

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
        : 'static/js/main.[name].[hash:6].bundle.js',
      chunkFilename: isDev
        ? 'static/js/chunk.[name].js'
        : 'static/js/chunk.[name].[hash:6].js',
      path: OUTPUT_PATH,
      assetModuleFilename: 'static/[hash][ext][query]',
      clean: true,
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
            : 'static/styles/style.[name].[hash:6].min.css'
        },
        chunkFilename: () => {
          return isDev
            ? 'static/styles/style.chunk.[name].css'
            : 'static/styles/style.chunk.[name].[hash:6].min.css'
        },
      }),
      new CopyPlugin({
        patterns: [path.resolve(__dirname, '../../public')],
      }),
      ...generateHtmlTemplatePlugin(),
    ],
    module: {
      rules: [
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
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src/app'),
        '@Styles': path.resolve(__dirname, '../../src/shared/styles'),
        '@Shared': path.resolve(__dirname, '../../src/shared/js'),
        '@Lib': path.resolve(__dirname, '../../src/lib'),
        '@Util': path.resolve(__dirname, '../../src/shared/utils'),
      },
    },
  }
}
