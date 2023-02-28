const { initializeApp } = require('firebase/app')

const { APP_FIREBASE_CONFIG } = require('../app_paths')
const firebaseConfig = require(APP_FIREBASE_CONFIG)

const appfire = initializeApp(firebaseConfig)
const { getStorage, ref, listAll } = require('firebase/storage')
const storage = getStorage(appfire)

const get_character_images = async (name) => {
  const listRef = ref(storage, `/characters/${name}/image`)

  const listData = await listAll(listRef)
    .then((res) => {
      return res.items.map(({ itemRef }) => itemRef.fullPath)
    })
    .then((res) => {
      return res.map((el) => {
        const imagesRef = ref(storage, `${el}`)

        return {
          link: `https://firebasestorage.googleapis.com/v0/b/${imagesRef.bucket}/o/characters%2F${name}%2Fimage%2F${imagesRef.name}?alt=media&token`,
          newLink: `https://firebasestorage.googleapis.com/v0/b/${imagesRef.bucket}/o/characters%2F${name}%2Ffull-size-image%2F${imagesRef.name}?alt=media&token`,
          small_link: `https://firebasestorage.googleapis.com/v0/b/${imagesRef.bucket}/o/characters%2F${name}%2Fimage%2F${imagesRef.name}?alt=media&token`,
          big_link: `https://firebasestorage.googleapis.com/v0/b/${imagesRef.bucket}/o/characters%2F${name}%2Ffull-size-image%2F${imagesRef.name}?alt=media&token`,
        }
      })
    })

  return listData
}

module.exports = {
  get_character_images,
}
