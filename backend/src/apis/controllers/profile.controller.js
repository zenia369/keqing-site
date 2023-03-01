/* eslint-disable class-methods-use-this */
const { user_data } = require('../../services/firebase/store.service')

class ProfileController {
  async update_avatar(req, res) {
    try {
      const { uid } = req.user
      const data = req.body

      await user_data.update_user(data, uid)

      res.status(200).json({ message: 'new avatar saved' })
    } catch (error) {
      res.status(500).json({ message: 'failed saving avater' })
    }
  }

  async update_info(req, res) {
    try {
      const { uid } = req.user
      const data = req.body

      await user_data.update_user(data, uid)

      res.status(200).json({ message: 'user info updated' })
    } catch (error) {
      res.status(500).json({ message: 'failed saving user info' })
    }
  }

  async update_stand(req, res) {
    try {
      const { uid } = req.user
      const { stand } = req.body

      await user_data.update_user_stand(stand, uid)

      res.status(200).json({ message: 'user stand updated' })
    } catch (error) {
      res.status(500).json({ message: 'failed updating user stand' })
    }
  }

  async delete_favorite(req, res) {
    try {
      const { uid } = req.user
      const { links } = req.body

      await user_data.delete_user_favorite_by_url(links, uid)

      res.status(200).josn({ message: 'user favorite image deleted' })
    } catch (error) {
      res.status(500).json({ message: 'failed deleting user favorite image' })
    }
  }

  async add_favorite(req, res) {
    try {
      const { uid } = req.user
      const data = req.body

      await user_data.update_user_favorite(data, uid)

      res.status(200).josn({ message: 'user favorite image added' })
    } catch (error) {
      res.status(500).json({ message: 'failed adding user favorite image' })
    }
  }
}

module.exports = new ProfileController()
