const path = require('path')
const MiniCss = require('mini-css-extract-plugin')

const generateEntries = require('./generateEntries')
const generateHtmlTemplatePlugin = require('./generateHtmlTemplatePlugin')

const OUTPUT_PATH = path.resolve(
  __dirname,
  '../../../backend/client/public/pages'
)

module.exports = (mode) => {
  const isDev = mode === 'development'

  return {
    mode,
    entry: generateEntries(),
    output: {
      filename: isDev
        ? '[name]/js/main.js'
        : '[name]/js/main.[hash:6].bundle.js',
      path: OUTPUT_PATH,
      publicPath: 'pages',
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
      new MiniCss({
        filename: ({ chunk }) => {
          if (chunk.filenameTemplate) {
            return '[name]/styles/style.css'
          }
          return isDev
            ? '[name]/styles/style.css'
            : '[name]/styles/style.[hash:6].min.css'
        },
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
                url: false,
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
          test: /\.(png|jpe?g|gif|svg|jfif)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: (url, resourcePath, context) => {
              const relativePath = path.relative(context, resourcePath)
              const folderName = relativePath
                .toString()
                .trim()
                .match(/app[\\/\\]([A-z]{1,}[\\/\\][A-z]{1,})/)[1]

              return `${folderName}\\${url}`
            },
          },
        },
        {
          test: /\.mp3$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: (url, resourcePath, context) => {
              const relativePath = path.relative(context, resourcePath)

              const folderName = relativePath
                .toString()
                .trim()
                .match(/app[\\/\\]([A-z]{1,}[\\/\\][A-z]{1,})/)[1]

              return `${folderName}\\${url}`
            },
          },
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
