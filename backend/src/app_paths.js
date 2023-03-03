const path = require('path')
const fs = require('fs')

const BUILD_PATH = path.resolve('/etc/secrets/')
const DATA_PATH = path.resolve(__dirname, '../data')

console.log(
  'data/serviceAccountKey',
  fs.existsSync(__dirname, '../data/serviceAccountKey.js')
)

console.log(
  'secrets/serviceAccountKey',
  fs.existsSync(path.join(BUILD_PATH, 'serviceAccountKey.js'))
)

module.exports = {
  APP_SERVICE_ACCOUNT: fs.existsSync(__dirname, '../data/serviceAccountKey.js')
    ? path.join(DATA_PATH, 'serviceAccountKey.js')
    : path.join(BUILD_PATH, 'serviceAccountKey.js'),
  APP_PICTURES_DATA: fs.existsSync(__dirname, '../data/pictures_data.json')
    ? path.join(DATA_PATH, 'pictures_data.json')
    : path.join(BUILD_PATH, 'pictures_data.json'),
  APP_CHARACTERS_LIST: fs.existsSync(__dirname, '../data/charactersList.js')
    ? path.join(DATA_PATH, 'charactersList.js')
    : path.join(BUILD_PATH, 'charactersList.js'),
  APP_FIREBASE_CONFIG: fs.existsSync(__dirname, '../data/firebaseConfig.json')
    ? path.join(DATA_PATH, 'firebaseConfig.json')
    : path.join(BUILD_PATH, 'firebaseConfig.json'),
  APP_CONFIG: fs.existsSync(__dirname, '../.env')
    ? path.resolve(__dirname, '../.env')
    : path.join(BUILD_PATH, '.env'),
  APP_API_DOC_FILE: fs.existsSync(__dirname, '../server_openapi.yaml')
    ? path.resolve(__dirname, '../server_openapi.yaml')
    : path.join(BUILD_PATH, 'server_openapi.yaml'),
}
