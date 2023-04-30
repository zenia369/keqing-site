import '../styles/style.scss'

import '@UI/Tooltip'
import '@Shared/userAvatar'
import { viewObserver } from '@Lib/k-view-observer'

import './modules/galleryImages'

import { GalleryNodes, PictureNodes } from './constants'

const galleryBox = document.querySelector(GalleryNodes.box) as HTMLElement
const galleryList = document.querySelector(GalleryNodes.list) as HTMLElement
const picturesBox = document.querySelector(PictureNodes.box) as HTMLElement

viewObserver.registerObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        galleryList.classList.add(
          'k-info__wrapper-gallery__listWrapp-box__list-active'
        )
      } else {
        galleryList.classList.remove(
          'k-info__wrapper-gallery__listWrapp-box__list-active'
        )
      }
    })
  },
  galleryBox,
  {
    rootMargin: '-50px',
    threshold: 0.7,
  }
)

viewObserver.registerObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        picturesBox.style.animationPlayState = 'running'
      } else {
        picturesBox.style.animationPlayState = 'paused'
      }
    })
  },
  picturesBox,
  {
    rootMargin: '-50px',
    threshold: 0.7,
  }
)
