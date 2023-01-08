const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = require("../data/firebaseConfig.json");
const { createSession } = require("./fireAuth");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = async (cred) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, cred.email, cred.password);
    const idToken = userCredential._tokenResponse.idToken;

    return createSession(idToken);
  } catch (e) {
    throw new Error(e.message);
  }
};
