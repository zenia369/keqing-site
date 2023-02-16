import { gsap } from 'gsap'
import { K_VIDEO_NAMES } from '../../constans'

class KVideo {
  #rootBtnClose = document.querySelector(K_VIDEO_NAMES.close_btn)

  #rootKVideo = document.querySelector(K_VIDEO_NAMES.root)

  #rootKVideoContent = this.#rootKVideo.querySelector(
    K_VIDEO_NAMES.root_content
  )

  #animationTL = gsap.timeline({
    defaults: { duration: 0.6, ease: 'none.none' },
  })

  open() {
    this.#animationTL.to(this.#rootKVideo, {
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'all',
    })
    this.#animationTL.to(
      this.#rootKVideoContent,
      {
        y: 0,
      },
      '<'
    )
  }

  #close() {
    this.#animationTL.to(this.#rootKVideoContent, {
      y: -100,
    })
    this.#animationTL.to(
      this.#rootKVideo,
      {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
      },
      '<'
    )
  }

  active() {
    this.#rootBtnClose.addEventListener('click', this.#close.bind(this))
  }
}

export default new KVideo()
