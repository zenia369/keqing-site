import { USER_CARD_NAMES } from '../../constants'

async function importCardModule() {
  await import(
    /* webpackChunkName: "profile_characters_data_module" */
    '../../../styles/components/charactersData.scss'
  )
  return import(/* webpackChunkName: "profile_card_module" */ './index').then(
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
