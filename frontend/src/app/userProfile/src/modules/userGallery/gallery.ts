import { gsap } from 'gsap'

import { KFetchV1 } from '@Lib/k-fetch'
import registerMessage from '@UI/Message/registerMessage'

import { KOVERLAY_NAME, USER_GALLERY_NAMES } from '../../constants'

class UserGallery {
  private rootGallery = document.querySelector(
    USER_GALLERY_NAMES.root
  ) as HTMLElement

  private openBtn = this.rootGallery.querySelector(
    USER_GALLERY_NAMES.rootOpenEditMode
  ) as HTMLElement

  private cancelBtn = this.rootGallery.querySelector(
    USER_GALLERY_NAMES.rootCancelEditMode
  ) as HTMLElement

  private submitBtn = this.rootGallery.querySelector(
    USER_GALLERY_NAMES.rootSubmitEditMode
  ) as HTMLElement

  private animationTL = gsap.timeline({
    defaults: { duration: 0.6, ease: 'none.none' },
  })

  private handleOpenEditMode() {
    this.animationTL
      .to(this.rootGallery, {
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
        this.openBtn,
        {
          display: 'none',
        },
        '<'
      )
      .to(
        USER_GALLERY_NAMES.rootEdtiModeControlls,
        {
          display: 'flex',
        },
        '>'
      )
      .then(this.setGalleruMode.bind(this))
  }

  private handleReverseAnimation() {
    this.setGalleruMode()

    this.animationTL.reverse()
    this.animationTL = gsap.timeline({
      defaults: { duration: 0.6, ease: 'none.none' },
    })
  }

  private handleCanceEditMode() {
    this.getGalleryList().forEach((node) => {
      const checkboxEl = node.querySelector(
        USER_GALLERY_NAMES.rootAvatarsListItemCheckbox
      ) as HTMLInputElement
      checkboxEl.checked = false
    })
    this.handleReverseAnimation()
  }

  private async handleSubmitEditMode() {
    const checkedList = this.getGalleryList().filter(
      (node) =>
        (
          node.querySelector(
            USER_GALLERY_NAMES.rootAvatarsListItemCheckbox
          ) as HTMLInputElement
        ).checked
    )

    try {
      await KFetchV1.delete('profile/delete_favorite', {
        data: {
          links: checkedList.map((node) =>
            (
              node.querySelector(
                USER_GALLERY_NAMES.rootAvatarsListItemLink
              ) as HTMLElement
            ).getAttribute('href')
          ),
        },
      })

      registerMessage.add({
        type: 'success',
        text: 'images deleted',
        time: 3000,
      })
      checkedList.forEach((node) => node.remove())
      this.handleReverseAnimation()
    } catch (error: any) {
      registerMessage.add({
        type: 'error',
        text: error.message ?? 'oops, failed. try again',
        time: 3000,
      })
      this.handleReverseAnimation()
    }
  }

  private getGalleryList() {
    return [
      ...(
        this.rootGallery.querySelector(
          USER_GALLERY_NAMES.rootGalleryList
        ) as HTMLElement
      ).children,
    ]
  }

  private setGalleruMode() {
    this.rootGallery.classList.toggle(USER_GALLERY_NAMES.editMode)
  }

  handleClickOpenEditModeBtn() {
    this.handleOpenEditMode()
  }

  active() {
    this.cancelBtn?.addEventListener(
      'click',
      this.handleCanceEditMode.bind(this)
    )
    this.submitBtn?.addEventListener(
      'click',
      this.handleSubmitEditMode.bind(this)
    )
  }
}

const userGallery = new UserGallery()

export default userGallery
