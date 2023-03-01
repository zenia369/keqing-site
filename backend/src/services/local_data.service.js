const { APP_PICTURES_DATA } = require('../app_paths')

const picturesData = require(APP_PICTURES_DATA)

class LocalDataService {
  // eslint-disable-next-line class-methods-use-this
  async filter_pictures({ limit = 20, offset = 0, ...filterBy }) {
    const filterItemsArray = new Map(Object.entries(filterBy))
    let filteredItems = []

    if (filterItemsArray.size > 0) {
      filteredItems = picturesData.items.filter((item) => {
        let isExist = 0

        filterItemsArray.forEach((filter, key) => {
          const elements = filter.split(',')

          elements.forEach((el) => {
            if (item[key].toString().includes(el)) {
              isExist += 1
            }
          })
        })

        return isExist > 0
      })
    } else {
      filteredItems = picturesData.items
    }

    const pictures = filteredItems
      .slice(Number(offset), Number(offset) + Number(limit))
      .map((el) => ({
        path: el.path,
        id: el.id,
      }))
    const isNextPage = pictures.length + Number(offset) < filteredItems.length

    return {
      isNextPage,
      offset: Number(offset),
      limit: Number(limit),
      count: pictures.length,
      items: pictures,
    }
  }
}

module.exports = new LocalDataService()
