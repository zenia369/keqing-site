import preloadImages from '@Util/preloadImages'

import galleryService from '../services/gallery.service'

import { GalleryNodes } from '../constants'

const listGallery = document.querySelector(GalleryNodes.list) as HTMLElement
const loaderGallery = document.querySelector(GalleryNodes.loader) as HTMLElement

const subscribe$ = galleryService.getSubscription()

subscribe$(
  async (data) => {
    if (data.images.length) {
      const loadedImages = await preloadImages(data.images)

      loadedImages.forEach((url, idx) => {
        const img = document.createElement('img')
        img.classList.add('k-info__wrapper-gallery__listWrapp-box__list__item')
        img.src = url
        img.alt = `Keqing gallery image ${idx}`
        listGallery.appendChild(img)
      })

      listGallery.style.display = 'flex'
      loaderGallery.style.display = 'none'
    }
  },
  ['images']
)
