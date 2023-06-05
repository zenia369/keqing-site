import { gsap } from 'gsap'

import { KFetchV1 } from '@Lib/k-fetch'
import extractUrlParams from '@Util/extractUrlParams'

import { K_IMAGE_NAMES } from '../../constans'

import showMessage from '../message'

class KImages {
  #rootBtnClose = document.querySelector(K_IMAGE_NAMES.close_btn)

  #rootKImages = document.querySelector(K_IMAGE_NAMES.root)

  #rootKImagesList = this.#rootKImages.querySelector(K_IMAGE_NAMES.root_list)

  #animationTL = gsap.timeline({
    defaults: { duration: 0.6, ease: 'none.none' },
  })

  #close() {
    this.#animationTL.to(this.#rootKImages, {
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    })
    this.#animationTL.to(
      this.#rootKImagesList,
      {
        y: 100,
      },
      '<'
    )
  }

  open() {
    this.#animationTL.to(this.#rootKImages, {
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'all',
    })
    this.#animationTL.to(
      this.#rootKImagesList,
      {
        y: 0,
      },
      '<'
    )
  }

  async #handleAddToFavorite(event) {
    const target = this.#searchFavoriteButton(event.target)
    const uid = extractUrlParams().get('uid')

    if (!target || !uid) return

    try {
      const res = await KFetchV1.patch('profile/update_favorite', {
        big_link: target.dataset.biglink,
        small_link: target.dataset.link,
      })

      showMessage(res.status, res.data.message)
    } catch (error) {
      showMessage(error.status, error.message)
    }
  }

  #searchFavoriteButton(target) {
    if (target.classList.contains(K_IMAGE_NAMES.name_root_list_item)) {
      return null
    }

    if (
      !target.classList.contains(K_IMAGE_NAMES.name_root_list_item_favorite)
    ) {
      return this.#searchFavoriteButton(target.parentElement)
    }

    return target
  }

  active() {
    this.#rootBtnClose.addEventListener('click', this.#close.bind(this))
    this.#rootKImagesList.addEventListener(
      'click',
      this.#handleAddToFavorite.bind(this)
    )
  }
}

export default new KImages()
