const { user_data } = require('../../services/firebase/store.service')
const {
  create_session,
  registration,
} = require('../../services/firebase/auth.service')

class AuthController {
  async login(req, res) {
    try {
      const { idToken } = req.body

      const { options, sessionCookie, uid } = await create_session(idToken)

      res.cookie('session', sessionCookie, options)
      res.status(200).json({
        uid,
      })
    } catch {
      res.status(401).json({
        message: 'UNAUTHORIZED REQUEST!',
      })
    }
  }

  async register(req, res) {
    try {
      const data = req.body

      const { options, sessionCookie, uid } = await registration(data)

      await user_data.create_user({ uid, data })

      res.cookie('session', sessionCookie, options)
      res.status(200).json({ uid })
    } catch {
      res.status(400).json({ message: 'user exist, try another email' })
    }
  }

  async register_google(req, res) {
    try {
      const { idToken, ...data } = req.body

      const { options, sessionCookie, uid } = await create_session(idToken)

      await user_data.create_user({ uid, data })

      res.cookie('session', sessionCookie, options)
      res.status(200).json({ uid })
    } catch {
      res.status(400).json({ message: 'user exist, try another email' })
    }
  }
}

module.exports = new AuthController()
