import { KFetchV1 } from '@Lib/k-fetch'
import registerMessage from '@UI/Message/registerMessage'

import { USER_CARD_NAMES } from '../../constants'

// eslint-disable-next-line import/no-cycle
import { CardMediator } from './cardMediator'

export default class ChangeUserInfo {
  protected cardMediator!: CardMediator

  private openBtn!: HTMLElement

  private closeBtn!: HTMLElement

  private userName!: HTMLElement

  private userCity!: HTMLElement

  private userElement!: HTMLElement

  constructor(cardMediator: CardMediator) {
    this.cardMediator = cardMediator
    this.openBtn = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.btnOpenSetting
    ) as HTMLElement
    this.closeBtn = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.rootFormCloseSetting
    ) as HTMLElement
    this.userName = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.userName
    ) as HTMLElement
    this.userCity = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.userCity
    ) as HTMLElement
    this.userElement = cardMediator.rootCard.querySelector(
      USER_CARD_NAMES.userElement
    ) as HTMLElement
  }

  #handleOpenSetting() {
    this.cardMediator.getAnimationTl().to(this.cardMediator.cardForm, {
      opacity: 1,
      visibility: 'visible',
      translateY: 0,
      scale: 1,
    })
  }

  async #handleSubmitSetting(event: Event) {
    event.preventDefault()
    const target = event.target as HTMLElement

    const name = target.querySelector(
      USER_CARD_NAMES.formName
    ) as HTMLInputElement
    const city = target.querySelector(
      USER_CARD_NAMES.formCity
    ) as HTMLInputElement
    const element = target.querySelector(
      USER_CARD_NAMES.formElement
    ) as HTMLInputElement

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

      registerMessage.add({
        type: 'success',
        text: 'updated',
        time: 3000,
      })
      this.cardMediator.handleReverseAnimation()
    } catch (error: any) {
      registerMessage.add({
        type: 'error',
        text: error.message ?? 'opps, failed. try again',
        time: 3000,
      })
    }
  }

  click() {
    this.#handleOpenSetting()
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
