const { get_character_images } = require('./storage.service')

jest.mock(require('../../app_paths').APP_FIREBASE_CONFIG, () => ({}), {
  virtual: true,
})

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    storage: jest.fn(),
  }),
}))

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn().mockReturnValue({
    bucket: 'mockBucket',
    name: 'image1.jpg',
  }),
  listAll: jest.fn().mockResolvedValue({
    items: [
      {
        fullPath: 'characters/character1/image/image1.jpg',
        name: 'image1.jpg',
      },
    ],
  }),
}))

describe('get_character_images', () => {
  it('should fetch character images', async () => {
    const name = 'character1'
    const expected = [
      {
        link: 'https://firebasestorage.googleapis.com/v0/b/mockBucket/o/characters%2Fcharacter1%2Fimage%2Fimage1.jpg?alt=media&token',
        newLink:
          'https://firebasestorage.googleapis.com/v0/b/mockBucket/o/characters%2Fcharacter1%2Ffull-size-image%2Fimage1.jpg?alt=media&token',
        small_link:
          'https://firebasestorage.googleapis.com/v0/b/mockBucket/o/characters%2Fcharacter1%2Fimage%2Fimage1.jpg?alt=media&token',
        big_link:
          'https://firebasestorage.googleapis.com/v0/b/mockBucket/o/characters%2Fcharacter1%2Ffull-size-image%2Fimage1.jpg?alt=media&token',
      },
    ]

    const result = await get_character_images(name)

    expect(result).toEqual(expected)
  })
})
