// eslint-disable-next-line import/no-unresolved
const { getAuth } = require('firebase-admin/auth')

const auth = getAuth()

module.exports = async (req, res, next) => {
  const sessionCookie = req?.cookies?.session

  if (!sessionCookie) throw new Error()

  try {
    const { uid } = await auth.verifySessionCookie(sessionCookie, true)
    req.user = { uid }

    return next()
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Please log in to the site' ?? err.message })
  }
}
