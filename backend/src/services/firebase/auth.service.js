// eslint-disable-next-line import/no-unresolved
const { getAuth } = require('firebase-admin/auth')

const { initializeApp } = require('firebase/app')
const {
  getAuth: getFireAuth,
  createUserWithEmailAndPassword,
} = require('firebase/auth')

const { APP_FIREBASE_CONFIG } = require('../../app_paths')

const firebaseConfig = require(APP_FIREBASE_CONFIG)
const appFireUser = initializeApp(firebaseConfig)

const authFireUser = getFireAuth(appFireUser)
const auth = getAuth()

const create_session = async (idToken) => {
  const { uid } = await auth.verifyIdToken(idToken)

  const expiresIn = 60 * 60 * 24 * 5 * 100
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
  const options = { maxAge: expiresIn, httpOnly: true, secure: true }

  return {
    options,
    sessionCookie,
    uid,
  }
}

const registration = async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    authFireUser,
    email,
    password
  )
  // eslint-disable-next-line no-underscore-dangle
  const { idToken } = userCredential._tokenResponse

  return idToken
}

module.exports = {
  create_session,
  registration,
}
