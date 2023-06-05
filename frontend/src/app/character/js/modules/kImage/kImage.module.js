import { K_IMAGE_NAMES } from '../../constans'

const openBtn = document.querySelector(K_IMAGE_NAMES.open_btn)

openBtn.addEventListener('click', async () => {
  const KImageModule = await import(
    /* webpackChunkName: "character_image_module" */ './index'
  ).then((m) => m.default)
  KImageModule.open()
  KImageModule.active()
})
