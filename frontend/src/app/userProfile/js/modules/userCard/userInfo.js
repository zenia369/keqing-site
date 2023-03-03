import { KFetchV1 } from '@Lib/k-fetch'

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
      await KFetchV1.patch('profile/update_info', {
        userName: name.value,
        userCity: city.value,
        userElement: element.value,
      })

      this.userName.innerText = name.value
      this.userCity.innerText = city.value
      this.userElement.innerText = element.value

      this.cardMediator.cardForm.reset()

      message('updated', 'ok')
      this.cardMediator.handleReverseAnimation()
    } catch (error) {
      message(error.message ?? 'failed, try again', 'err')
    }
  }

  click(e) {
    this.#handleOpenSetting(e)
  }

  active() {
    // this.openBtn.addEventListener('click', this.#handleOpenSetting.bind(this))
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
