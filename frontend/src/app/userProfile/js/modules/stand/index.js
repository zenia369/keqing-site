import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { KFetchV1 } from '@Lib/k-fetch'

import { CHARACTERS_DATA_NAMES, USER_STAND_NAMES } from '../../constants'

import CharactersStand from './charactersStand'
import UserStand from './userStand'
import message from '../message'

gsap.registerPlugin(ScrollToPlugin)

const initalState = {
  initalStand: undefined,
  activeIndex: undefined,
}

class StandMediator {
  #state = structuredClone(initalState)

  rootUserStand = document.querySelector(USER_STAND_NAMES.root_stand)

  rootUserStandItems = [...this.rootUserStand.children]

  rootStand = document.querySelector(CHARACTERS_DATA_NAMES.root_stand)

  closeBtn = this.rootStand.querySelector(CHARACTERS_DATA_NAMES.root_close_btn)

  animationTL = gsap.timeline({
    defaults: { duration: 0.6, ease: 'none.none' },
  })

  constructor() {
    this.userStand = new UserStand(this)

    this.charactersStand = new CharactersStand(this)
    this.charactersStand.active()
  }

  handleClick(e) {
    this.userStand.click(e)
  }

  handleReverseAnimation() {
    this.animationTL.reverse()
    this.animationTL = gsap.timeline({
      defaults: { duration: 0.6, ease: 'none.none' },
    })

    this.setUserStandActiveItem()
    this.setState()
  }

  async handleUpsateUserStand() {
    const newStand = this.rootUserStandItems.map(this.getDataFromTargetItem)
    try {
      await KFetchV1.patch('profile/update_stand', {
        stand: newStand.map((s) => ({
          name: s.name,
          element: s.element,
          images: {
            small: s.photo,
          },
        })),
      })

      message('stand updated', 'ok')
      this.handleReverseAnimation()
    } catch (error) {
      message(error.message ?? 'failed, try again', 'err')
    }
  }

  getState() {
    return this.#state
  }

  getTargetItem(node, query) {
    if (node.classList.contains(query)) return node

    return this.getTargetItem(node.parentElement, query)
  }

  // eslint-disable-next-line class-methods-use-this
  getDataFromTargetItem(node) {
    const photo = node
      .querySelector(USER_STAND_NAMES.id_photo)
      .getAttribute('src')
    const element = node
      .querySelector(USER_STAND_NAMES.id_element)
      .getAttribute('src')

    return {
      id: node.dataset?.id,
      name: node.dataset.name,
      photo,
      element,
    }
  }

  setState(newState = structuredClone(initalState)) {
    this.#state = { ...this.#state, ...newState }
  }

  setUserStandActiveItem(id) {
    this.rootUserStandItems.forEach((node) =>
      node.classList.remove(USER_STAND_NAMES.active_stand_item)
    )

    this.rootUserStandItems[id]?.classList.add(
      USER_STAND_NAMES.active_stand_item
    )
  }

  setUserStandItemData(
    newData,
    nodeIndex = this.#state.activeIndex,
    isClear = false
  ) {
    const isExist = this.rootUserStandItems.find(
      (i) => i.dataset.name === newData.name
    )

    if (isExist && !isClear) return

    const nodeItem = this.rootUserStandItems[nodeIndex]
    nodeItem
      .querySelector(USER_STAND_NAMES.id_photo)
      .setAttribute('src', newData.photo)
    nodeItem
      .querySelector(USER_STAND_NAMES.id_element)
      .setAttribute('src', newData.element)

    nodeItem.dataset.name = newData.name
    nodeItem.querySelector(USER_STAND_NAMES.id_name).textContent = newData.name
  }
}

const standMediator = new StandMediator()

export default standMediator
