import { USER_CARD_NAMES } from '../../constants'

async function importCardModule() {
  await import(
    /* webpackChunkName: "profile_characters_data_module" */
    '../../../styles/components/charactersData.scss'
  )
  return import(
    /* webpackChunkName: "profile_card_module" */ './cardMediator'
  ).then((m) => m.default)
}

const rootAvatar = document.querySelector(USER_CARD_NAMES.rootAvatar)
const rootSettingBtn = document.querySelector(USER_CARD_NAMES.btnOpenSetting)

rootAvatar?.addEventListener('click', async () => {
  const CardMediator = await importCardModule()
  CardMediator.handleAvatarClick()
})

rootSettingBtn?.addEventListener('click', async () => {
  const CardMediator = await importCardModule()
  CardMediator.handleSettingClick()
})
