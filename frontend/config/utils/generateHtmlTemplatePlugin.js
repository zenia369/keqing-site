const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATH_TO_HTML = 'src/app/**/*.html'

module.exports = () => {
  return glob
    .sync(PATH_TO_HTML)
    .map((file) => {
      return {
        name: file.match(/.+\/([a-zA-Z]{1,})\/[a-zA-Z]{1,}.html/)[1],
        fileName: file.match(/.+\/[a-zA-Z]{1,}\/([a-zA-Z]{1,}).html/)[1],
        path: file,
      }
    })
    .map(
      (template) =>
        new HtmlWebpackPlugin({
          template: template.path,
          inject: 'body',
          chunks: [template.name.toString()],
          filename: `pages/${template.name}/index.html`,
        })
    )
}
