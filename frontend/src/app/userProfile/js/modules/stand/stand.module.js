import { USER_STAND_NAMES } from '../../constants'

const rootUserStand = document.querySelector(USER_STAND_NAMES.root_stand)

rootUserStand.addEventListener('click', async (e) => {
  const StandMediator = await import(
    /* webpackChunkName: "standModule" */ './index'
  ).then((m) => m.default)

  StandMediator.handleClick(e)
})
