// IMPORT

import '../styles/style.scss'

// END IMPORT

import '@Shared/userAvatar'
import { KFetchV1 } from '@Lib/k-fetch'

const warapperGallery = document.querySelector(
  '.k-info__wrapper-gallery__listWrapp-box__list'
)
const galleryBox = document.querySelector('.k-info__wrapper-gallery')
const list = document.querySelector(
  '.k-info__wrapper-gallery__listWrapp-box__list'
)
const loader = document.getElementById('loader')

let isScrolling = false

window.addEventListener('load', () => {
  galerry()
  window.addEventListener('scroll', throttleScroll, false)
  document.addEventListener('DOMContentLoaded', scrolling, false)
})

async function galerry() {
  const { data } = await KFetchV1.get('images')

  preloadImages(data.images)
}
function createElementGallery(gallerySrc) {
  gallerySrc.forEach((el) => {
    const img = document.createElement('img')
    img.classList.add('k-info__wrapper-gallery__listWrapp-box__list__item')
    img.src = el
    img.alt = 'Keqing-site'
    warapperGallery.appendChild(img)
  })

  list.style.display = 'flex'
  loader.style.display = 'none'
}

function throttleScroll(e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function () {
      scrolling(e)
      isScrolling = false
    })
  }
  isScrolling = true
}
function scrolling() {
  if (isFullyVisible(galleryBox)) {
    list.classList.add('k-info__wrapper-gallery__listWrapp-box__list-active')
  } else {
    list.classList.remove('k-info__wrapper-gallery__listWrapp-box__list-active')
  }
}
function isFullyVisible(el) {
  const elementBoundary = el.getBoundingClientRect()

  const { top } = elementBoundary
  const { bottom } = elementBoundary
  return top >= 0 && bottom <= window.innerHeight
}

function preloadImages(sources) {
  Promise.all(
    sources.map((src) => {
      const img = document.createElement('img')
      img.src = src
      return new Promise((r) => (img.onload = img.onerror = r))
    })
  ).then(() => createElementGallery(sources))
}
