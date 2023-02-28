const { getFirestore } = require('firebase-admin/firestore')

const {
  hash_password,
  create_random_user_data,
} = require('../../helpers/common.helper')

const db = getFirestore()

class UserData {
  async #get_user_by_id(uid) {
    const userRef = db.collection('users').doc(uid)

    return {
      user: (await userRef.get()).data(),
      userRef,
    }
  }

  async get_user(uid) {
    const { user } = await this.#get_user_by_id(uid)

    return user
  }

  async update_user(data, uid) {
    const { user, userRef } = await this.#get_user_by_id(uid)

    await userRef.set({
      ...user,
      ...data,
    })
  }

  async update_user_stand(data, uid) {
    const { user, userRef } = await this.#get_user_by_id(uid)

    await userRef.set({
      ...user,
      stand: data,
    })
  }

  async update_user_favorite(data, uid) {
    const { user, userRef } = await this.#get_user_by_id(uid)

    const favorites = [...user.favorites]
    const isExist = favorites.find(
      (el) => el.bigLink === data.big_link && el.link === data.small_link
    )

    await userRef.set({
      ...user,
      favorites: isExist ? favorites : [...favorites, data],
    })
  }

  async delete_user_favorite_by_url(data, uid) {
    const { user, userRef } = await this.#get_user_by_id(uid)

    const favorites = [...user.favorites]

    await userRef.set({
      ...user,
      favorites: favorites.filter((el) => !data.includes(el)),
    })
  }

  async create_user({ uid, data }) {
    const { userRef } = await this.#get_user_by_id(uid)

    const { avatar, card, stand } = create_random_user_data()

    await userRef.set({
      avatar,
      stand,
      card,
      id: uid,
      name: data.userName,
      city: data.userCity,
      element: data.userElement,
      favorites: [],
      email: data.email,
      password: hash_password(cred.password),
    })
  }
}

class StoreData {
  async #get_data_by_doc_name(doc) {
    const snapshot = await db.collection('keqing').doc(doc).get()
    const data = snapshot.data()

    return data
  }

  async get_data(docName, docOption) {
    const data = await this.#get_data_by_doc_name(docName)

    return docOption ? data[docOption] : data
  }
}

module.exports = {
  user_data: new UserData(),
  store_data: new StoreData(),
}
