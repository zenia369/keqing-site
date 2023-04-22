import { USER_GALLERY_NAMES } from '../../constants'

const rootOpenEditModeBtn = document.querySelector(
  USER_GALLERY_NAMES.rootOpenEditMode
)

rootOpenEditModeBtn?.addEventListener('click', async () => {
  const UserGallery = await import(
    /* webpackChunkName: "galleryModule" */ './gallery'
  ).then((m) => m.default)
  UserGallery.handleClickOpenEditModeBtn()
  UserGallery.active()
})
