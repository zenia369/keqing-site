/* eslint-disable max-classes-per-file */
import Filter from './filter/filter'

class ModalWindow {
  imageWindow = document.querySelector('.image-screen')

  btnClose = document.querySelector('.image-screen__close')

  #imageTag = document.querySelector('.image-screen__wrapp img')

  #modalActiveClassName = 'image-screen-active'

  open(src) {
    document.body.style.overflowY = 'hidden'
    this.imageWindow.classList.toggle(this.#modalActiveClassName)
    this.setModalImgSrc(src)
  }

  close() {
    document.body.style.overflowY = 'overlay'
    this.imageWindow.classList.toggle(this.#modalActiveClassName)
  }

  setModalImgSrc(src) {
    this.#imageTag.setAttribute('src', src)
  }
}

class EvenEmmiter extends ModalWindow {
  #btnMoveList = [...document.querySelectorAll('.big-image-move-btn')]

  #gallery = document.querySelector('.gallery')

  #activeTarget = undefined

  #linkToControlPressingKeys = undefined

  #linkToCatchCloseEvent = undefined

  #catchOpenEvent(event) {
    const { target } = event
    if (target.tagName !== 'IMG') return

    this.#activeTarget = target
    target.dataset.open = true
    const src = target.getAttribute('src')
    this.open(src)

    this.#linkToCatchCloseEvent = this.#catchCloseEvent.bind(this)
    this.#linkToControlPressingKeys = this.#controlPressingKeys.bind(this)
    this.imageWindow.addEventListener('click', this.#linkToCatchCloseEvent)
    this.btnClose.addEventListener('click', this.#linkToCatchCloseEvent)
    window.addEventListener('keydown', this.#linkToControlPressingKeys)
  }

  #catchCloseEvent(event) {
    if (event.target !== event.currentTarget) return

    this.close()
    this.#activeTarget.dataset.open = false

    this.imageWindow.removeEventListener('click', this.#linkToCatchCloseEvent)
    this.btnClose.removeEventListener('click', this.#linkToCatchCloseEvent)
    window.removeEventListener('keydown', this.#linkToControlPressingKeys)
  }

  async #catchMoveEvent(event) {
    const moveSide = event.currentTarget.dataset.moveside
    const items = [...this.#gallery.children]
    const activeItemIndex = items.findIndex((el) => el.dataset.open === 'true')
    let newSrc
    let newImg

    if (moveSide === 'right') {
      newImg = items[activeItemIndex + 1]
      if (newImg) {
        newSrc = newImg
      } else {
        const hasNexItem = await Filter.pagination()
        if (hasNexItem) {
          this.#controlPressingKeys({ key: 'ArrowRight' })
        } else {
          this.#toggleHiddeBtn('add', 'right')
        }
      }
      this.#toggleHiddeBtn('remove')
    } else if (moveSide === 'left') {
      newImg = items[activeItemIndex - 1]
      if (newImg) {
        newSrc = newImg
      } else {
        this.#toggleHiddeBtn('add')
      }
      this.#toggleHiddeBtn('remove', 'right')
    }

    if (!newImg) return

    items[activeItemIndex].dataset.open = false
    this.#activeTarget = newSrc
    newSrc.dataset.open = true

    this.setModalImgSrc(newSrc.src)
  }

  #toggleHiddeBtn(method, side = 'left') {
    this.#btnMoveList
      .find((node) => node.dataset.moveside === side)
      .classList[method]('hidde')
  }

  #controlPressingKeys(event) {
    switch (event.key) {
      case 'ArrowRight':
        this.#catchMoveEvent({
          currentTarget: { dataset: { moveside: 'right' } },
        })
        break
      case 'ArrowLeft':
        this.#catchMoveEvent({
          currentTarget: { dataset: { moveside: 'left' } },
        })
        break
      default:
        this.#catchCloseEvent({
          target: this.imageWindow,
          currentTarget: this.imageWindow,
        })
    }
  }

  active() {
    this.#gallery.addEventListener('click', this.#catchOpenEvent.bind(this))
    this.#btnMoveList.forEach((el) =>
      el.addEventListener('click', this.#catchMoveEvent.bind(this))
    )
  }
}

export default new EvenEmmiter()
