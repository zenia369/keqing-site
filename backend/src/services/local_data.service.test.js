const { filter_pictures } = require('./local_data.service')

describe('Test local data service', () => {
  it('#filter_pictures not filtred', async () => {
    const mockData = { limit: 20, offset: 0 }

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
