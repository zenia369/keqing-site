import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { CHARACTERS_DATA_NAMES, USER_CARD_NAMES } from '../../constants'

import UserAvatar from './userAvatar'
import UserInfo from './userInfo'

gsap.registerPlugin(ScrollToPlugin)

class CardMediator {
  #animationTL = gsap.timeline({
    defaults: { duration: 0.6, ease: 'none.none' },
  })

  rootCard = document.querySelector(USER_CARD_NAMES.root_card)

  rootCharacterAvatar = document.querySelector(
    CHARACTERS_DATA_NAMES.root_avatars
  )

  cardForm = this.rootCard.querySelector(USER_CARD_NAMES.root_form)

  cardAvatar = this.rootCard.querySelector(USER_CARD_NAMES.root_avatar)

  constructor() {
    this.userAvatar = new UserAvatar(this)
    this.userInfo = new UserInfo(this)

    this.userAvatar.active()
    this.userInfo.active()
  }

  getAnimationTl() {
    return this.#animationTL
  }

  handleReverseAnimation() {
    this.#animationTL.reverse()
    this.#animationTL = gsap.timeline({
      defaults: { duration: 0.6, ease: 'none.none' },
    })
  }

  handleAvatarClick(e) {
    this.userAvatar.click(e)
  }

  handleSettingClick(e) {
    this.userInfo.click(e)
  }
}

const cardMediator = new CardMediator()

export default cardMediator
