const { getFirestore } = require('firebase-admin/firestore')

const createHashPassword = require('../helpers/createHashPassword')
const { APP_CHARACTERS_LIST } = require('../app_paths')
const characterList = require(APP_CHARACTERS_LIST)

const db = getFirestore()

class UserProfile {
  async changeUserData(cred, uid) {
    try {
      const snapshot = await db.collection('users').doc(uid).get()
      const data = snapshot.data()

      const newUserData = {
        ...data,
        ...cred,
      }

      const docRef = await db.collection('users').doc(uid)
      await docRef.set(newUserData)
    } catch (error) {
      console.warn(error)
      throw Error()
    }
  }

  async changeUserDataStandByID(cred, uid) {
    try {
      const snapshot = await db.collection('users').doc(uid).get()
      const data = snapshot.data()

      const stand = [...data.stand].map((el) => {
        if (el.id === cred.id) {
          return {
            ...cred.newCard,
            id: cred.id,
          }
        }

        return el
      })
      const newUserData = {
        ...data,
        stand,
      }

      const docRef = await db.collection('users').doc(uid)
      await docRef.set(newUserData)
    } catch (error) {
      throw Error()
    }
  }

  async update_user_stand(cred, uid) {
    try {
      const snapshot = await db.collection('users').doc(uid).get()
      const data = snapshot.data()

      const newUserData = {
        ...data,
        stand: cred,
      }

      const docRef = await db.collection('users').doc(uid)
      await docRef.set(newUserData)
    } catch (error) {
      throw Error('Error: saving is failed')
    }
  }

  async getUserData(uid) {
    try {
      const snapshot = await db.collection('users').doc(uid).get()
      const data = snapshot.data()

      return data
    } catch (error) {
      return undefined
    }
  }

  async deleteUserFavoriteItem(cred, uid) {
    try {
      const snapshot = await db.collection('users').doc(uid).get()
      const data = snapshot.data()

      let favorites = [...data.favorites]

      cred.links.forEach((el) => {
        favorites = favorites.filter((item) => item.bigLink !== el)
      })

      const newUserData = {
        ...data,
        favorites,
      }

      const docRef = await db.collection('users').doc(uid)
      await docRef.set(newUserData)
    } catch (error) {
      throw Error()
    }
  }
}

class UserWife {
  async addUserFavoriteItem(cred, uid) {
    try {
      const snapshot = await db.collection('users').doc(uid).get()
      const data = snapshot.data()

      let favorites = [...data.favorites]

      const checkExistItem = [...data.favorites].filter(
        (el) => el.bigLink === cred.bigLink && el.link === cred.link
      )
      if (checkExistItem.length === 0) {
        favorites = [{ ...cred }, ...favorites]
      }

      const newUserData = {
        ...data,
        favorites,
      }

      const docRef = await db.collection('users').doc(uid)
      await docRef.set(newUserData)
    } catch (error) {
      throw Error()
    }
  }
}

class UserRegistration {
  async createUserData({ uid, ...cred }) {
    const docRef = await db.collection('users').doc(uid)

    const hashedPasswod = createHashPassword(cred.password)

    const { card, avatar } = Store.chooseRandomCard()

    await docRef.set({
      name: cred.userName,
      card: card,
      avatar: avatar,
      id: uid,
      city: cred.userCity,
      element: cred.userElement,
      stand: [
        {
          name: 'Choose',
          element:
            'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2FPrimogem.webp?alt=media&token=d9cc10df-c9c8-458d-ae9f-cd84ee3a4660',
          images: {
            small:
              'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2Ftinywow_resize_2948007.jpg?alt=media&token=4caab555-06e6-47da-8d50-5dd96dc86bfa',
          },
          id: 0,
        },
        {
          name: 'Choose',
          element:
            'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2FPrimogem.webp?alt=media&token=d9cc10df-c9c8-458d-ae9f-cd84ee3a4660',
          images: {
            small:
              'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2Ftinywow_resize_2948007.jpg?alt=media&token=4caab555-06e6-47da-8d50-5dd96dc86bfa',
          },
          id: 1,
        },
        {
          name: 'Choose',
          element:
            'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2FPrimogem.webp?alt=media&token=d9cc10df-c9c8-458d-ae9f-cd84ee3a4660',
          images: {
            small:
              'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2Ftinywow_resize_2948007.jpg?alt=media&token=4caab555-06e6-47da-8d50-5dd96dc86bfa',
          },
          id: 2,
        },
        {
          name: 'Choose',
          element:
            'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2FPrimogem.webp?alt=media&token=d9cc10df-c9c8-458d-ae9f-cd84ee3a4660',
          images: {
            small:
              'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2Ftinywow_resize_2948007.jpg?alt=media&token=4caab555-06e6-47da-8d50-5dd96dc86bfa',
          },
          id: 3,
        },
        {
          name: 'Choose',
          element:
            'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2FPrimogem.webp?alt=media&token=d9cc10df-c9c8-458d-ae9f-cd84ee3a4660',
          images: {
            small:
              'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2Ftinywow_resize_2948007.jpg?alt=media&token=4caab555-06e6-47da-8d50-5dd96dc86bfa',
          },
          id: 4,
        },
        {
          name: 'Choose',
          element:
            'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2FPrimogem.webp?alt=media&token=d9cc10df-c9c8-458d-ae9f-cd84ee3a4660',
          images: {
            small:
              'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2Ftinywow_resize_2948007.jpg?alt=media&token=4caab555-06e6-47da-8d50-5dd96dc86bfa',
          },
          id: 5,
        },
        {
          name: 'Choose',
          element:
            'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2FPrimogem.webp?alt=media&token=d9cc10df-c9c8-458d-ae9f-cd84ee3a4660',
          images: {
            small:
              'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2Ftinywow_resize_2948007.jpg?alt=media&token=4caab555-06e6-47da-8d50-5dd96dc86bfa',
          },
          id: 6,
        },
        {
          name: 'Choose',
          element:
            'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2FPrimogem.webp?alt=media&token=d9cc10df-c9c8-458d-ae9f-cd84ee3a4660',
          images: {
            small:
              'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2FuserProfile%2Ftinywow_resize_2948007.jpg?alt=media&token=4caab555-06e6-47da-8d50-5dd96dc86bfa',
          },
          id: 7,
        },
      ],
      favorites: [],
      email: cred.email,
      password: hashedPasswod,
    })
  }
}

class Store extends classes(UserProfile, UserRegistration, UserWife) {
  async getData(doc, option) {
    const snapshot = await db
      .collection(process.env.FIRE_STORE_COLLECTION)
      .doc(doc)
      .get()
    const data = snapshot.data()

    return data[option]
  }

  static chooseRandomCard() {
    const randomNumber = Math.floor(Math.random() * characterList.length)

    const card = characterList[randomNumber].card
    const avatar = characterList[randomNumber].images.big

    return { avatar, card }
  }
}

function classes(...args) {
  const constructors = []

  class Class {
    constructor(...opts) {
      for (const arg of args) {
        const props = Object.getOwnPropertyNames(arg.prototype)

        for (const prop of props) {
          if (prop === 'constructor') {
            constructors.push(arg.prototype.constructor)
          } else {
            Class.prototype[prop] = arg.prototype[prop]
          }
        }
      }

      for (const constructor of constructors) {
        Object.assign(Class.prototype, new constructor(...opts))
      }
    }
  }

  return Class
}

const store = new Store()

module.exports = store
