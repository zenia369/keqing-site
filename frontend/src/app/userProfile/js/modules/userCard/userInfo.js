import KFetch from '@Lib/k-fetch'
import extractUrlParams from '@Util/extractUrlParams'

import { USER_CARD_NAMES } from '../../constants'
import message from '../message'

export default class ChangeUserInfo {
  constructor(cardMediator) {
    this.cardMediator = cardMediator
    this.openBtn = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.btn_open_setting
    )
    this.closeBtn = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.root_form_close_setting
    )
    this.userName = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.user_name
    )
    this.userCity = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.user_city
    )
    this.userElement = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.user_element
    )
  }

  #handleOpenSetting() {
    this.cardMediator.getAnimationTl().to(this.cardMediator.cardForm, {
      opacity: 1,
      visibility: 'visible',
      translateY: 0,
      scale: 1,
    })
  }

  async #handleSubmitSetting(event) {
    event.preventDefault()
    const { target } = event

    const name = target[USER_CARD_NAMES.form_name]
    const city = target[USER_CARD_NAMES.form_city]
    const element = target[USER_CARD_NAMES.form_element]

    try {
      const params = extractUrlParams()

      await KFetch.put('profile/changeInfo', {
        name: name.value,
        city: city.value,
        element: element.value,
        uid: params.get('uid'),
      })

      this.userName.innerText = name.value
      this.userCity.innerText = city.value
      this.userElement.innerText = element.value

      name.value = ''
      city.value = ''
      element.value = ''

      message('updated', 'ok')
      this.cardMediator.handleReverseAnimation()
    } catch (error) {
      message(error.message ?? 'failed, try again', 'err')
    }
  }

  active() {
    this.openBtn.addEventListener('click', this.#handleOpenSetting.bind(this))
    this.closeBtn.addEventListener(
      'click',
      this.cardMediator.handleReverseAnimation.bind(this.cardMediator)
    )
    this.cardMediator.cardForm.addEventListener(
      'submit',
      this.#handleSubmitSetting.bind(this)
    )
  }
}
