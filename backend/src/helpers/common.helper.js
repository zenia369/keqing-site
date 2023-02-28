const bcrypt = require('bcrypt')

const { APP_CHARACTERS_LIST } = require('../app_paths')
const character_list = require(APP_CHARACTERS_LIST)

const hash_password = (password) =>
  bcrypt.hashSync(password, Number(process.env.BCRYPT_KEY))

const compare_passwords = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword)

const create_random_user_data = () => {
  const randomNumber = Math.floor(Math.random() * character_list.length)

  const card = characterList[randomNumber].card
  const avatar = characterList[randomNumber].images.big
  const stand = [
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
  ]

  return { avatar, card, stand }
}

module.exports = {
  hash_password,
  compare_passwords,
  create_random_user_data,
}
