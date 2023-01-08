const { getAuth } = require("firebase-admin/auth");
const auth = getAuth();

module.exports = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.session || undefined;
    if (!sessionCookie) throw Error();

    const { uid } = await auth.verifySessionCookie(sessionCookie, true);
    if (!uid) throw Error();

    const { continuePath } = req.query;

    if (!continuePath) throw Error();

    res.redirect(`${continuePath}?uid=${uid}`);
  } catch (error) {
    next();
  }
};
