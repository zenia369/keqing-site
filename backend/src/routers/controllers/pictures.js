const path = require('path')
const localDataService = require('../../services/local_data.service')

const { APP_PICTURES_DATA } = require('../../app_paths')

const { filter: filterData } = require(APP_PICTURES_DATA)

const pictures = async (req, res) => {
  const { query } = req

  const { items: filtredPictures } = await localDataService.filter_pictures(
    query
  )

  const getFilter = []
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in filterData) {
    const data = {}
    const element = filterData[key]

    data.name = element.name
    data.nameID = key
    data.items = element.items.map((el) => ({ value: el, checked: false }))

    if (Object.hasOwnProperty.call(query, key)) {
      const queryValues = query[key]
      data.items = data.items.map((el) => {
        if (queryValues.includes(el.value)) return { ...el, checked: true }

        return el
      })
    }

    getFilter.push(data)
  }

  res.render(path.resolve(__dirname, '../../../client/views/pictures.hbs'), {
    layout: 'layout-pictures',
    pictures: filtredPictures,
    filter: getFilter,
    rangeValue: query.limit ?? 20,
  })
}

module.exports = pictures
