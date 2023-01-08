const Router = require("express");
const router = Router();

const { getAuth } = require("firebase-admin/auth");
const auth = getAuth();

router.post("/login", async (req, res) => {
  try {
    const { idToken } = req.body;

    const expiresIn = 60 * 60 * 24 * 5 * 100;

    const { uid } = await auth.verifyIdToken(idToken, true);

    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true };

    res.cookie("session", sessionCookie, options);
    res.status(200).send(JSON.stringify({ uid }));
  } catch (error) {
    console.warn(error);
    res.status(401).send("UNAUTHORIZED REQUEST!");
  }
});

module.exports = router;
