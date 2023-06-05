const path = require('path')

const {
  get_character_images,
} = require('../../services/firebase/storage.service')
const {
  store_data,
  user_data,
} = require('../../services/firebase/store.service')

const character = async (req, res) => {
  try {
    const name = req.params.name || 'keqing'
    const { uid } = req.query

    const user = await user_data.get_user(uid)
    if (!user) throw Error('user not defined')

    const data = await Promise.all([
      store_data.get_data('characters', name),
      get_character_images(name),
    ])

    res.render(path.resolve(__dirname, '../../../client/views/character.hbs'), {
      layout: 'layout-character',
      name,
      images: data[1],
      ...data[0],
    })
  } catch (error) {
    res.redirect('/registration')
  }
}

module.exports = character
