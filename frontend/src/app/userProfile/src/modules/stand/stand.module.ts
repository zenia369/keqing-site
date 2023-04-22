import { USER_STAND_NAMES } from '../../constants'

const rootUserStand = document.querySelector(USER_STAND_NAMES.rootStand)

rootUserStand?.addEventListener('click', async (e) => {
  if ((e.currentTarget as HTMLElement).isEqualNode(e.target as HTMLElement))
    return

  await import(
    /* webpackChunkName: "profile_characters_data_module" */
    '../../../styles/components/charactersData.scss'
  )
  const StandMediator = await import(
    /* webpackChunkName: "profile_stand_module" */ './standMediator'
  ).then((m) => m.default)

  StandMediator.handleClick(e)
})
