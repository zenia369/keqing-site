const mockNewUserdData = {
  avatar: 'test-avatar',
  card: 'test-card',
  stand: 'test-stand',
}
const mockStoreSet = jest.fn()
const mockCreate_random_user_data = jest.fn().mockReturnValue(mockNewUserdData)
const mockHashePas = jest.fn().mockReturnValue('test-hashed-password')

const mockStoreCollection = jest.fn()

jest.mock('firebase-admin/firestore', () => ({
  getFirestore: jest.fn().mockReturnValue({
    collection: mockStoreCollection,
  }),
}))

jest.mock('../../helpers/common.helper', () => ({
  hash_password: mockHashePas,
  create_random_user_data: mockCreate_random_user_data,
}))

const { store_data, user_data } = require('./store.service')

describe('Test store service', () => {
  describe('Test user data', () => {
    const mockUserData = {
      uid: 'test-uid',
      stand: [],
      favorites: [],
    }

    beforeAll(() => {
      mockStoreCollection.mockReturnValue({
        doc: jest.fn().mockImplementation(() => ({
          get: jest.fn().mockResolvedValue({
            data: jest.fn().mockReturnValue(mockUserData),
          }),
          set: mockStoreSet,
        })),
      })
    })
    afterEach(() => {
      mockUserData.favorites = []
    })

    it('#get_user', async () => {
      const res = await user_data.get_user(mockUserData.uid)

      expect(res).toEqual(mockUserData)
      expect(mockStoreCollection).toBeCalledWith('users')
    })

    it('#update_user', async () => {
      const newData = { newData: 'test' }

      await user_data.update_user(newData, mockUserData.uid)

      expect(mockStoreSet).toBeCalledWith({ ...mockUserData, ...newData })
    })

    it('#update_user_stand', async () => {
      const newData = { stand: 'test' }

      await user_data.update_user_stand(newData, mockUserData.uid)

      expect(mockStoreSet).toBeCalledWith({ ...mockUserData, stand: newData })
    })

    it('#update_user_favorite new item', async () => {
      mockUserData.favorites.push({ big_link: 'test-link-1' })
      const newData = { big_link: 'test-link' }

      await user_data.update_user_favorite(newData, mockUserData.uid)

      expect(mockStoreSet).toBeCalledWith({
        ...mockUserData,
        favorites: [...mockUserData.favorites, newData],
      })
    })

    it('#update_user_favorite exist item', async () => {
      mockUserData.favorites.push({ big_link: 'test-link-1' })
      const newData = { big_link: 'test-link-1' }

      await user_data.update_user_favorite(newData, mockUserData.uid)

      expect(mockStoreSet).toBeCalledWith({
        ...mockUserData,
        favorites: mockUserData.favorites,
      })
    })

    it('#delete_user_favorite_by_url', async () => {
      const newData = ['test-link-1']

      await user_data.delete_user_favorite_by_url(newData, mockUserData.uid)

      expect(mockStoreSet).toBeCalledWith({
        ...mockUserData,
        favorites: [],
      })
    })

    it('#create_user', async () => {
      const newData = {
        userName: 'test-userName',
        userCity: 'test-userCity',
        userElement: 'test-userElement',
        email: 'test-email',
        password: 'test-password',
      }

      const expected = {
        ...mockNewUserdData,
        id: 'test-uid',
        favorites: [],
        name: newData.userName,
        city: newData.userCity,
        element: newData.userElement,
        email: newData.email,
        password: 'test-hashed-password',
      }

      await user_data.create_user({
        data: newData,
        uid: mockUserData.uid,
      })

      expect(mockStoreSet).toBeCalledWith(expected)
    })
  })

  describe('Test store data', () => {
    const mockDocName = 'test-doc'
    const mockDocOptName = 'test'
    const mockTestValue = 'test-value'
    const mockData = { test: mockTestValue }

    const mockStoreDoc = jest.fn().mockImplementation(() => ({
      get: jest.fn().mockResolvedValue({
        data: jest.fn().mockReturnValue(mockData),
      }),
      set: mockStoreSet,
    }))

    beforeAll(() => {
      mockStoreCollection.mockReturnValue({
        doc: mockStoreDoc,
      })
    })

    it('#get_data without option', async () => {
      const res = await store_data.get_data(mockDocName)

      expect(mockStoreCollection).toBeCalledWith('keqing')
      expect(mockStoreDoc).toBeCalledWith(mockDocName)
      expect(res).toEqual(mockData)
    })

    it('#get_data with option', async () => {
      const res = await store_data.get_data(mockDocName, mockDocOptName)

      expect(res).toEqual(mockData[mockDocOptName])
    })
  })
})
