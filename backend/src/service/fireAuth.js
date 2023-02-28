const { getAuth } = require("firebase-admin/auth");

const auth = getAuth();

module.exports = {
  createSession: async (idToken) => {
    const { uid } = await auth.verifyIdToken(idToken);

    const expiresIn = 60 * 60 * 24 * 5 * 100;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true };

    return {
      options,
      sessionCookie,
      uid,
    };
  },
};
