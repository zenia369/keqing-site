import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { CHARACTERS_DATA_NAMES, USER_CARD_NAMES } from '../../constants'

// eslint-disable-next-line import/no-cycle
import UserAvatar from './userAvatar'
// eslint-disable-next-line import/no-cycle
import UserInfo from './userInfo'

gsap.registerPlugin(ScrollToPlugin)

export class CardMediator {
  private animationTL = gsap.timeline({
    defaults: { duration: 0.6, ease: 'none.none' },
  })

  protected userAvatar!: UserAvatar

  protected userInfo!: UserInfo

  rootCard = document.querySelector(USER_CARD_NAMES.rootCard) as HTMLElement

  rootCharacterAvatar = document.querySelector(
    CHARACTERS_DATA_NAMES.rootAvatars
  ) as HTMLElement

  cardForm = this.rootCard.querySelector(
    USER_CARD_NAMES.rootForm
  ) as HTMLFormElement

  cardAvatar = this.rootCard.querySelector(
    USER_CARD_NAMES.rootAvatar
  ) as HTMLElement

  constructor() {
    this.userAvatar = new UserAvatar(this)
    this.userInfo = new UserInfo(this)

    this.userAvatar.active()
    this.userInfo.active()
  }

  getAnimationTl() {
    return this.animationTL
  }

  handleReverseAnimation() {
    this.animationTL.reverse()
    this.animationTL = gsap.timeline({
      defaults: { duration: 0.6, ease: 'none.none' },
    })
  }

  handleAvatarClick() {
    this.userAvatar.click()
  }

  handleSettingClick() {
    this.userInfo.click()
  }
}

const cardMediator = new CardMediator()

export default cardMediator
