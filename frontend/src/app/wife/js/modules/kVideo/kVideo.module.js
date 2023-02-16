import { K_VIDEO_NAMES } from '../../constans'

const openBtn = document.querySelector(K_VIDEO_NAMES.open_btn)

openBtn.addEventListener('click', async () => {
  const KVideoModule = await import(
    /* webpackChunkName: "character_video_module" */ './index'
  ).then((m) => m.default)
  KVideoModule.open()
  KVideoModule.active()
})
