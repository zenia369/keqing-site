const { send_mail } = require('../../services/mail.service')

class Author {
  // eslint-disable-next-line class-methods-use-this
  async send_message(req, res) {
    try {
      const { message, email } = req.body

      await send_mail({ message, email })

      res.status(200).json({ message: 'message delivered' })
    } catch {
      res.status(400).json({ message: 'opps, some error sending message' })
    }
  }
}

module.exports = new Author()
