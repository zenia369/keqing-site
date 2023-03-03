import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { KFetchV1 } from '@Lib/k-fetch'

import APP_FIREBASE_CONFIG from '../../../../../config/firebaseConfig.json'

const app = initializeApp(APP_FIREBASE_CONFIG)
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

const createFetch = async (idToken) => {
  const { data } = await KFetchV1.post('auth/login', { idToken })

  return data.uid
}

export const login = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  const idToken = await user.getIdToken()

  const uid = await createFetch(idToken)

  return uid
}

export const google = async () => {
  await signInWithPopup(auth, provider)
  const idToken = await auth.currentUser.getIdToken()

  const uid = await createFetch(idToken)

  return uid
}

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email)
}
