const path = require('path')

const { user_data } = require('../../services/firebase/store.service')

const { APP_CHARACTERS_LIST } = require('../../app_paths')

const charactersList = require(APP_CHARACTERS_LIST)

const profile = async (req, res) => {
  try {
    const { uid } = req.query

    const user = await user_data.get_user(uid)

    res.render(path.resolve(__dirname, '../../../client/views/profile.hbs'), {
      layout: 'layout-profile',
      user,
      charactersList,
    })
  } catch (error) {
    res.redirect('/registration')
  }
}

module.exports = profile
