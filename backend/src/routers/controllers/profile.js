const path = require('path')

const { user_data } = require('../../services/firebase/store.service')

const { get_random_background } = require('../../helpers/common.helper')

const { APP_CHARACTERS_LIST } = require('../../app_paths')

const charactersList = require(APP_CHARACTERS_LIST)

const profile = async (req, res) => {
  try {
    const { uid } = req.query

    const user = await user_data.get_user(uid)
    const background = get_random_background()

    res.render(path.resolve(__dirname, '../../../client/views/profile.hbs'), {
      layout: 'layout-profile',
      user: {
        ...user,
        favorites: user.favorites.map((el) =>
          el.bigLink && el.link
            ? {
                big_link: el.bigLink,
                small_link: el.link,
              }
            : el
        ),
      },
      page: {
        charactersList,
        background,
      },
    })
  } catch (error) {
    res.redirect('/registration')
  }
}

module.exports = profile
