import { KFetchV1 } from '@Lib/k-fetch'
import { LOCAL_AVATAR_KEY } from '@Shared/constans'
import { setLSItem } from '@Util/storage'
import registerMessage from '@UI/Message/registerMessage'

import { CHARACTERS_DATA_NAMES, USER_CARD_NAMES } from '../../constants'

// eslint-disable-next-line import/no-cycle
import { CardMediator } from './cardMediator'

type StateType = {
  initial: {
    card: string
    src: string
  }
  active: {
    card: string
    src: string
  }
}

export default class ChangeAvatart {
  private state: StateType = {
    initial: {
      card: '',
      src: '',
    },
    active: {
      card: '',
      src: '',
    },
  }

  private cardMediator!: CardMediator

  private closeBtn!: HTMLElement

  private submitBtn!: HTMLElement

  private rootList!: HTMLElement

  private rootAvatar!: HTMLElement

  constructor(cardMediator: CardMediator) {
    this.cardMediator = cardMediator
    this.closeBtn = cardMediator.rootCharacterAvatar.querySelector(
      CHARACTERS_DATA_NAMES.rootCloseBtn
    ) as HTMLElement
    this.submitBtn = cardMediator.rootCharacterAvatar.querySelector(
      CHARACTERS_DATA_NAMES.rootSubmitBtn
    ) as HTMLElement
    this.rootList = cardMediator.rootCharacterAvatar.querySelector(
      CHARACTERS_DATA_NAMES.rootAvatarsList
    ) as HTMLElement
    this.rootAvatar = cardMediator.cardAvatar.querySelector(
      USER_CARD_NAMES.rootAvatarItem
    ) as HTMLElement

    this.state.initial = {
      card: cardMediator.rootCard.style.backgroundImage as string,
      src: this.rootAvatar.style.backgroundImage as string,
    }
  }

  private handleOpenChangeAvatar() {
    this.cardMediator
      .getAnimationTl()
      .to(window, {
        scrollTo: { y: 0 },
      })
      .to(document.body, {
        overflow: 'hidden',
      })
      .to(
        CHARACTERS_DATA_NAMES.root,
        {
          visibility: 'visible',
          opacity: 1,
        },
        '<'
      )
      .set(CHARACTERS_DATA_NAMES.rootAvatars, {
        opacity: 0,
        translateX: 150,
      })
      .to(
        CHARACTERS_DATA_NAMES.rootAvatars,
        {
          display: 'block',
          translateX: 0,
          opacity: 1,
        },
        '<'
      )
      .to(
        this.cardMediator.rootCard,
        {
          position: 'relative',
          zIndex: 20,
          y: -50,
        },
        '<'
      )
  }

  private handleCloseChangeAvatar() {
    this.setCardData(this.state.initial.card, this.state.initial.src)
    this.cardMediator.handleReverseAnimation()
  }

  private handleClickList(event: Event) {
    const target =
      (event.target as HTMLElement).tagName === 'LI'
        ? (event.target as HTMLElement)
        : ((event.target as HTMLElement).parentElement as HTMLElement)

    if (!target) return

    const { card, src } = target.dataset as { card: string; src: string }

    this.state.active = { card, src }

    this.setCardData(`url(${card})`, `url(${src}`)
  }

  private async handleSubmit() {
    try {
      await KFetchV1.patch('profile/update_avatar', {
        avatar: this.state.active.src,
        card: this.state.active.card,
      })

      registerMessage.add({
        type: 'success',
        text: 'updated',
        time: 3000,
      })

      this.cardMediator.handleReverseAnimation()

      setLSItem(LOCAL_AVATAR_KEY, this.state.active.src)
    } catch (error: any) {
      registerMessage.add({
        type: 'error',
        text: error.message ?? 'oops, failed. try again',
        time: 3000,
      })
    }
  }

  private setCardData(card: string, src: string) {
    this.cardMediator.rootCard.style.backgroundImage = card
    this.rootAvatar.style.backgroundImage = src
  }

  click() {
    this.handleOpenChangeAvatar()
  }

  active() {
    this.closeBtn.addEventListener(
      'click',
      this.handleCloseChangeAvatar.bind(this)
    )
    this.submitBtn.addEventListener('click', this.handleSubmit.bind(this))
    this.rootList.addEventListener('click', this.handleClickList.bind(this))
  }
}
