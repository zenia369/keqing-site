import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import showMessage from './showMessage'
import state from './state'
import authStatus from './authStatus'

import APP_FIREBASE_CONFIG from '../../../../../config/firebaseConfig.json'

const app = initializeApp(APP_FIREBASE_CONFIG)

const auth = getAuth(app)
auth.languageCode = 'ukr' // add ukraine language

const provider = new GoogleAuthProvider()

const googleAuthHandler = async () => {
  try {
    const result = await signInWithPopup(auth, provider)

    const idToken = await auth.currentUser.getIdToken()
    const { email } = result.user

    authStatus()

    state.idToken = idToken
    state.email = email
    state.newUrl = '/google'
  } catch (error) {
    showMessage(error.message)
  }
}

export default googleAuthHandler
