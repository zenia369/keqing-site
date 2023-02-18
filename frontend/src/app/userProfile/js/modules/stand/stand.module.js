import { USER_STAND_NAMES } from '../../constants'

const rootUserStand = document.querySelector(USER_STAND_NAMES.root_stand)

rootUserStand.addEventListener('click', async (e) => {
  if (e.currentTarget.isEqualNode(e.target)) return

  await import(
    /* webpackChunkName: "profile_characters_data_module" */
    '../../../styles/components/charactersData.scss'
  )
  const StandMediator = await import(
    /* webpackChunkName: "profile_stand_module" */ './index'
  ).then((m) => m.default)

  StandMediator.handleClick(e)
})
