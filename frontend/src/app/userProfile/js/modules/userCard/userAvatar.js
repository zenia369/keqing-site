import KFetch from '@Lib/k-fetch'
import { LOCAL_AVATAR_KEY } from '@Shared/constans'
import { setLSItem } from '@Util/storage'
import extractUrlParams from '@Util/extractUrlParams'

import { CHARACTERS_DATA_NAMES, USER_CARD_NAMES } from '../../constants'
import message from '../message'

export default class ChangeAvatart {
  #state = {
    initial: undefined,
    active: undefined,
  }

  #initialState = undefined

  constructor(cardMediator) {
    this.cardMediator = cardMediator
    this.closeBtn = cardMediator.rootCharacterAvatar.querySelector(
      CHARACTERS_DATA_NAMES.root_close_btn
    )
    this.submitBtn = cardMediator.rootCharacterAvatar.querySelector(
      CHARACTERS_DATA_NAMES.root_submit_btn
    )
    this.rootList = cardMediator.rootCharacterAvatar.querySelector(
      CHARACTERS_DATA_NAMES.root_avatars_list
    )
    this.rootAvatar = cardMediator.cardAvatar.querySelector(
      USER_CARD_NAMES.root_avatar_item
    )

    this.#state.initial = {
      card: cardMediator.rootCard.style.backgroundImage,
      src: this.rootAvatar.style.backgroundImage,
    }
  }

  #handleOpenChangeAvatar() {
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
      .set(CHARACTERS_DATA_NAMES.root_avatars, {
        opacity: 0,
        translateX: 150,
      })
      .to(
        CHARACTERS_DATA_NAMES.root_avatars,
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

  #handleCloseChangeAvatar() {
    this.#setCardData(this.#state.initial.card, this.#state.initial.src)
    this.cardMediator.handleReverseAnimation()
  }

  #handleClickList(event) {
    const target =
      event.target.tagName === 'LI' ? event.target : event.target.parentElement

    if (!target) return

    const { card, src } = target.dataset

    this.#state.active = { card, src }

    this.#setCardData(`url(${card})`, `url(${src}`)
  }

  async #handleSubmit() {
    try {
      const params = extractUrlParams()

      await KFetch.put('profile/changeAvatar', {
        avatar: this.#state.active.src,
        card: this.#state.active.card,
        uid: params.get('uid'),
      })

      message('updated', 'ok')

      this.cardMediator.handleReverseAnimation()

      setLSItem(LOCAL_AVATAR_KEY, this.#state.active.src)
    } catch (error) {
      message('failed, try again', 'err')
    }
  }

  #setCardData(card, src) {
    this.cardMediator.rootCard.style.backgroundImage = card
    this.rootAvatar.style.backgroundImage = src
  }

  click(e) {
    this.#handleOpenChangeAvatar(e)
  }

  active() {
    this.closeBtn.addEventListener(
      'click',
      this.#handleCloseChangeAvatar.bind(this)
    )
    this.submitBtn.addEventListener('click', this.#handleSubmit.bind(this))
    this.rootList.addEventListener('click', this.#handleClickList.bind(this))
  }
}
