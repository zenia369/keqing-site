import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import KFetch from "@Lib/k-fetch";

import firebaseConfig from "../../../../../../backend/data/firebaseConfig.json";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const createFetch = async (idToken) => {
  const { data } = await KFetch.post("auth/login", { idToken });

  return data.uid;
};

export const login = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await user.getIdToken();

  const uid = await createFetch(idToken);

  return uid;
};

export const google = async () => {
  await signInWithPopup(auth, provider);
  const idToken = await auth.currentUser.getIdToken();

  const uid = await createFetch(idToken);

  return uid;
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};
