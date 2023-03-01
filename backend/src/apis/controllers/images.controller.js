const localDataService = require('../../services/local_data.service')
const { store_data } = require('../../services/firebase/store.service')

class ImagesController {
  // eslint-disable-next-line class-methods-use-this
  async #get_data(option_name) {
    const data = await store_data.get_data('pages', option_name)
    return data
  }

  async login_page(req, res) {
    try {
      const data = await this.#get_data('login-images')

      res.status(200).json({ images: data })
    } catch (error) {
      res.status(500).json({ message: 'failed getting data for login page' })
    }
  }

  async home_page(req, res) {
    try {
      const data = await this.#get_data('main_images')

      res.status(200).json({ images: data })
    } catch (error) {
      res.status(500).json({ message: 'failed getting data for home page' })
    }
  }

  async characters_page(req, res) {
    try {
      // TO-DO - change properties name on firebase
      const data = await this.#get_data('myWife_cards').then((r) =>
        r.map((el) => ({
          game_href: el['game-href'],
          game_poster: el['game-img'],
          game_name: el['name-game'],
          items: el.items.map((c) => ({
            name: c.pageName,
            url: c.pageURL,
            poster: c.backgraundURL,
          })),
        }))
      )

      res.status(200).json({ images: data })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'failed getting data for character page' })
    }
  }

  async register_page(req, res) {
    try {
      const data = await this.#get_data('registration_page')

      res.status(200).json({ images: data })
    } catch (error) {
      res.status(500).json({ message: 'failed getting data for register page' })
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async pictures_page(req, res) {
    try {
      const { query } = req

      const data = await localDataService.filter_pictures(query)

      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ message: 'failed getting data for pictures page' })
    }
  }
}
module.exports = new ImagesController()
