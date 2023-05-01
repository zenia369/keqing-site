/* eslint-disable max-classes-per-file */

import registerMessage from '@UI/Message/registerMessage'
import { createObserver } from '@Lib/k-observer'

import filterService from '../services/filter.service'

import { BigImageNodes, CommonNodes } from '../constants'

type BigImageElement = HTMLElement & { dataset: { open: 'true' | 'false' } }
type StoreType = {
  isOpen: boolean
  src: null | string
  activeTarget: null | BigImageElement
}

const enum MoveSideEnum {
  left = 'left',
  right = 'right',
}

const storeObserver = createObserver<StoreType>({
  isOpen: false,
  src: null,
  activeTarget: null,
})

class BigImageModal {
  private modalActiveClassName = 'image-screen-active'

  private modalBox = document.querySelector(BigImageNodes.box) as HTMLElement

  private modalBoxImage = document.querySelector(
    BigImageNodes.boxImage
  ) as HTMLElement

  constructor(private store: typeof storeObserver) {
    this.store.subscribe(
      ({ isOpen, src }: StoreType) => {
        if (isOpen && src) {
          this.updateModalImage(src)
          document.body.style.overflowY = 'hidden'
          this.modalBox.classList.add(this.modalActiveClassName)
        } else {
          document.body.style.overflowY = 'overlay'
          this.modalBox.classList.remove(this.modalActiveClassName)
        }
      },
      ['isOpen', 'src']
    )
  }

  updateModalImage(src: string) {
    this.modalBoxImage.setAttribute('src', src)
  }
}

class BigImage {
  private moveBtns = document.querySelectorAll(BigImageNodes.moveBtns)

  private closeBtn = document.querySelector(
    BigImageNodes.closeBtn
  ) as HTMLElement

  private gallery = document.querySelector(CommonNodes.gallery) as HTMLElement

  constructor(
    private store: typeof storeObserver,
    private service: typeof filterService
  ) {}

  active() {
    this.gallery.addEventListener('click', this.mountEvent.bind(this))
    window.addEventListener('keyup', this.controlPressingKeys.bind(this))
    this.closeBtn.addEventListener('click', this.unmountEvent.bind(this))
    this.moveBtns.forEach((b) =>
      (b as HTMLElement).addEventListener(
        'click',
        this.moveEvent.bind(this) as any
      )
    )
  }

  private mountEvent(event: Event) {
    const target = event.target as BigImageElement
    if (target && target.tagName !== 'IMG') return

    target.dataset.open = 'true'
    const src = target.getAttribute('src') as string
    this.store.subject.isOpen = true
    this.store.subject.src = src
    this.store.subject.activeTarget = target
  }

  private unmountEvent() {
    const target = this.store.subject.activeTarget
    if (!target) {
      return
    }

    target.dataset.open = 'false'
    this.store.subject.isOpen = false

    window.removeEventListener('keyup', this.controlPressingKeys.bind(this))
  }

  private controlPressingKeys(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
        this.moveEvent({
          currentTarget: { dataset: { moveside: 'right' } },
        } as any)
        break
      case 'ArrowLeft':
        this.moveEvent({
          currentTarget: { dataset: { moveside: 'left' } },
        } as any)
        break
      default:
        this.unmountEvent()
    }
  }

  private async moveEvent(
    event: Event & {
      currentTarget: {
        dataset: { moveside: MoveSideEnum.left | MoveSideEnum.right }
      }
    }
  ) {
    const moveSide = event.currentTarget.dataset.moveside
    const items = [...this.gallery.children] as BigImageElement[]
    const activeItemIndex = items.findIndex((el) => el.dataset.open === 'true')

    const currentTarget = items[activeItemIndex]
    let target: undefined | BigImageElement

    if (moveSide === MoveSideEnum.left) {
      target = items[activeItemIndex - 1]
      if (!target) {
        registerMessage.add({
          text: 'oops, it`s first image',
          time: 1500,
          type: 'warning',
          isForce: true,
        })
        return
      }
    } else if (moveSide === MoveSideEnum.right) {
      target = items[activeItemIndex + 1]
      if (!target) {
        this.service.createRequestPagination()

        if (!this.service.getObserver().subject.isNextPage) {
          registerMessage.add({
            text: 'oops, it`s last image',
            time: 1500,
            type: 'warning',
            isForce: true,
          })
        }

        return
      }
    }

    if (target) {
      currentTarget.dataset.open = 'false'
      target.dataset.open = 'true'
      const src = target.getAttribute('src') as string
      this.store.subject.src = src
      this.store.subject.activeTarget = target
    }
  }
}

const bigImageModal = new BigImageModal(storeObserver)
const bigImage = new BigImage(storeObserver, filterService)
bigImage.active()
export default bigImage
