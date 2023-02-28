const admin = require('firebase-admin')

const { APP_SERVICE_ACCOUNT } = require('../app_paths')
const serviceAccount = require(APP_SERVICE_ACCOUNT)

module.exports = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_BUCKET_NAME,
  })
}
