import '../style/style.scss'

import './modules/kImage/kImage.module'
import './modules/kVideo/kVideo.module'

window.addEventListener('load', () => {
  ;[...document.querySelectorAll('.loaded-content')].forEach((el) =>
    el.classList.remove('visibility')
  )
  ;[...document.querySelectorAll('.loader')].forEach((el) =>
    el.classList.add('visibility')
  )
})
