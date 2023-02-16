import { USER_GALLERY_NAMES } from '../../constants'

const rootOpenEditModeBtn = document.querySelector(
  USER_GALLERY_NAMES.root_open_edit_mode
)

rootOpenEditModeBtn?.addEventListener('click', async () => {
  const UserGallery = await import(
    /* webpackChunkName: "galleryModule" */ './index'
  ).then((m) => m.default)
  UserGallery.handleClickOpenEditModeBtn()
  UserGallery.active()
})
