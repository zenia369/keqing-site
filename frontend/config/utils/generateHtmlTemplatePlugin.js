/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATH_TO_HTML = 'src/app/**/*.html'
const PATH_TO_HBS = 'src/app/**/page.hbs'

const createHTMLPlugin = (file) => {
  const fileData = {
    name: file.match(/.+\/([a-zA-Z]{1,})\/[a-zA-Z]{1,}.[a-zA-Z]{1,}$/)[1],
    path: file,
  }

  return new HtmlWebpackPlugin({
    template: fileData.path,
    chunks: [fileData.name.toString()],
    filename: `pages/${fileData.name}/index.html`,
  })
}

module.exports = () => {
  const entry = []

  glob.sync(PATH_TO_HTML).forEach((file) => {
    entry.push(createHTMLPlugin(file))
  })

  glob.sync(PATH_TO_HBS).forEach((file) => {
    entry.push(createHTMLPlugin(file))
  })

  return entry
}
