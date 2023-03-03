import { gsap } from 'gsap'
import { KFetchV1 } from '@Lib/k-fetch'

import { KOVERLAY_NAME, USER_GALLERY_NAMES } from '../../constants'
import message from '../message'

class UserGallery {
  #rootGallery = document.querySelector(USER_GALLERY_NAMES.root)

  #openBtn = this.#rootGallery.querySelector(
    USER_GALLERY_NAMES.root_open_edit_mode
  )

  #cancelBtn = this.#rootGallery.querySelector(
    USER_GALLERY_NAMES.root_cancel_edit_mode
  )

  #submitBtn = this.#rootGallery.querySelector(
    USER_GALLERY_NAMES.root_submit_edit_mode
  )

  // #animationTL = animation()
  #animationTL = gsap.timeline({
    defaults: { duration: 0.6, ease: 'none.none' },
  })

  #handleOpenEditMode() {
    this.#animationTL
      .to(this.#rootGallery, {
        position: 'relative',
        zIndex: 10,
      })
      .to(
        KOVERLAY_NAME,
        {
          visibility: 'visible',
          opacity: 1,
        },
        '>'
      )
      .to(
        this.#openBtn,
        {
          display: 'none',
        },
        '<'
      )
      .to(
        USER_GALLERY_NAMES.root_edti_mode_controlls,
        {
          display: 'flex',
        },
        '>'
      )
      .then(this.#setGalleruMode.bind(this))
  }

  #handleReverseAnimation() {
    this.#setGalleruMode()

    this.#animationTL.reverse()
    this.#animationTL = gsap.timeline({
      defaults: { duration: 0.6, ease: 'none.none' },
    })
  }

  #handleCanceEditMode() {
    this.#getGalleryList().forEach((node) => {
      const checkboxEl = node.querySelector(
        USER_GALLERY_NAMES.root_avatars_list_item_checkbox
      )
      checkboxEl.checked = false
    })
    this.#handleReverseAnimation()
  }

  async #handleSubmitEditMode() {
    const checkedList = this.#getGalleryList().filter(
      (node) =>
        node.querySelector(USER_GALLERY_NAMES.root_avatars_list_item_checkbox)
          .checked
    )

    try {
      await KFetchV1.delete('profile/delete_favorite', {
        data: {
          links: checkedList.map((node) =>
            node
              .querySelector(USER_GALLERY_NAMES.root_avatars_list_item_link)
              .getAttribute('href')
          ),
        },
      })

      message('images deleted', 'ok')
      checkedList.forEach((node) => node.remove())
      this.#handleReverseAnimation()
    } catch (error) {
      message(error.message ?? 'failed, try again', 'err')
      this.#handleReverseAnimation()
    }
  }

  #getGalleryList() {
    return [
      ...this.#rootGallery.querySelector(USER_GALLERY_NAMES.root_gallery_list)
        .children,
    ]
  }

  #setGalleruMode() {
    this.#rootGallery.classList.toggle(USER_GALLERY_NAMES.edit_mode)
  }

  handleClickOpenEditModeBtn() {
    this.#handleOpenEditMode()
  }

  active() {
    this.#cancelBtn?.addEventListener(
      'click',
      this.#handleCanceEditMode.bind(this)
    )
    this.#submitBtn?.addEventListener(
      'click',
      this.#handleSubmitEditMode.bind(this)
    )
  }
}

const userGallery = new UserGallery()

export default userGallery
