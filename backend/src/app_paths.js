const path = require('path')

const BUILD_PATH = path.resolve('/etc/secrets/')
const DATA_PATH = path.resolve(__dirname, '../data')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  APP_SERVICE_ACCOUNT: isDev
    ? path.join(DATA_PATH, 'serviceAccountKey.js')
    : path.join(BUILD_PATH, 'serviceAccountKey.js'),
  APP_PICTURES_DATA: isDev
    ? path.join(DATA_PATH, 'pictures_data.json')
    : path.join(BUILD_PATH, 'pictures_data.json'),
  APP_CHARACTERS_LIST: isDev
    ? path.join(DATA_PATH, 'charactersList.js')
    : path.join(BUILD_PATH, 'charactersList.js'),
  APP_FIREBASE_CONFIG: isDev
    ? path.join(DATA_PATH, 'firebaseConfig.json')
    : path.join(BUILD_PATH, 'firebaseConfig.json'),
  APP_CONFIG: isDev
    ? path.resolve(__dirname, '../.env')
    : path.join(BUILD_PATH, '.env'),
  APP_API_DOC_FILE: path.resolve(__dirname, '../server_openapi.yaml'),
}
