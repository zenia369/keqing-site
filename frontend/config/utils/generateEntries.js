/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const glob = require('glob')

const PATH_TO_JS = './src/app/**/js/main.js'
const PATH_TO_JS_FOR_HB = './src/app/**/js/main.hb.js'
const PATH_TO_TS = './src/app/**/src/main.ts'
const PATH_TO_TS_FOR_HB = './src/app/**/src/main.hb.ts'

const DIR_NAME_REGEX = /([a-zA-Z]{1,})\/(js|src)/

module.exports = () => {
  const entry = {}

  glob.sync(PATH_TO_JS).forEach((file) => {
    const name = file.match(DIR_NAME_REGEX)[1]
    entry[name] = file
  })

  glob.sync(PATH_TO_JS_FOR_HB).forEach((file) => {
    const name = file.match(DIR_NAME_REGEX)[1]
    entry[name] = {
      import: file,
      filename: 'static/js/main.[name].hb.js',
    }
  })

  glob.sync(PATH_TO_TS).forEach((file) => {
    const name = file.match(DIR_NAME_REGEX)[1]
    entry[name] = file
  })

  glob.sync(PATH_TO_TS_FOR_HB).forEach((file) => {
    const name = file.match(DIR_NAME_REGEX)[1]
    entry[name] = {
      import: file,
      filename: 'static/js/main.[name].hb.js',
    }
  })

  return entry
}
