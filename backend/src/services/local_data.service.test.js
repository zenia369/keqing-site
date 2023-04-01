const { filter_pictures } = require('./local_data.service')

jest.mock(
  require('../app_paths').APP_PICTURES_DATA,
  () => ({
    length: 2,
    limit: 20,
    offset: 20,
    items: [
      {
        path: '/static/pictures/photo_2022-09-15_13-21-32.jpg',
        id: 'photo_2022-09-15_13-21-32',
        target: null,
        regions: ['сумеру'],
        tags: [],
        labes: [],
      },
      {
        path: '/static/pictures/photo_2022-09-15_13-22-43.jpg',
        id: 'photo_2022-09-15_13-22-43',
        target: null,
        regions: ['інадзума'],
        tags: [],
        labes: ['кукі шінобе'],
      },
    ],
  }),
  {
    virtual: true,
  }
)

describe('Test local data service', () => {
  it('#filter_pictures not filtred', async () => {
    const mockData = { limit: 2, offset: 0 }

    const res = await filter_pictures(mockData)

    expect(res).toBeTruthy()
    expect(res).toMatchObject(mockData)
    expect(res.items).toHaveLength(mockData.limit)
  })

  it('#filter_pictures filtred', async () => {
    const mockData = { limit: 20, offset: 0, regions: 'сумеру' }

    const res = await filter_pictures(mockData)

    expect(res).toBeTruthy()
    expect(res.items.length).toBeGreaterThan(0)
  })
})
