import { USER_CARD_NAMES } from '../../constants'

function importCardModule() {
  return import(/* webpackChunkName: "cardModule" */ './index').then(
    (m) => m.default
  )
}

const rootAvatar = document.querySelector(USER_CARD_NAMES.root_avatar)
const rootSettingBtn = document.querySelector(USER_CARD_NAMES.btn_open_setting)

rootAvatar.addEventListener('click', async (e) => {
  const CardMediator = await importCardModule()
  CardMediator.handleAvatarClick(e)
})

rootSettingBtn.addEventListener('click', async (e) => {
  const CardMediator = await importCardModule()
  CardMediator.handleSettingClick(e)
})
