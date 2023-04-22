import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { KFetchV1 } from '@Lib/k-fetch'
import registerMessage from '@UI/Message/registerMessage'

import { CHARACTERS_DATA_NAMES, USER_STAND_NAMES } from '../../constants'

// eslint-disable-next-line import/no-cycle
import CharactersStand from './charactersStand'
// eslint-disable-next-line import/no-cycle
import UserStand from './userStand'

gsap.registerPlugin(ScrollToPlugin)

type InitalStandType = {
  id: number
  name: string
  photo: string
  element: string
}

type InitalStateType = {
  initalStand: InitalStandType[]
  activeIndex: number
}

export type StandMediatorType = StandMediator

const initalState: InitalStateType = {
  initalStand: [],
  activeIndex: 0,
}

class StandMediator {
  private state: InitalStateType = structuredClone(initalState)

  protected userStand!: UserStand

  protected charactersStand!: CharactersStand

  rootUserStand = document.querySelector(
    USER_STAND_NAMES.rootStand
  ) as HTMLElement

  rootUserStandItems = [...this.rootUserStand.children] as HTMLElement[]

  rootStand = document.querySelector(
    CHARACTERS_DATA_NAMES.rootStand
  ) as HTMLElement

  closeBtn = this.rootStand.querySelector(
    CHARACTERS_DATA_NAMES.rootCloseBtn
  ) as HTMLElement

  animationTL = gsap.timeline({
    defaults: { duration: 0.6, ease: 'none.none' },
  })

  constructor() {
    this.userStand = new UserStand(this)

    this.charactersStand = new CharactersStand(this)
    this.charactersStand.active()
  }

  handleClick(e: Event) {
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

      registerMessage.add({
        type: 'success',
        text: 'stand updated',
        time: 3000,
      })
      this.handleReverseAnimation()
    } catch (error: any) {
      registerMessage.add({
        type: 'error',
        text: error.message ?? 'oops. failed, try again',
        time: 3000,
      })
    }
  }

  getState() {
    return this.state
  }

  getTargetItem(node: HTMLElement, query: string): HTMLElement {
    if (node.classList.contains(query)) return node

    return this.getTargetItem(node.parentElement as HTMLElement, query)
  }

  // eslint-disable-next-line class-methods-use-this
  getDataFromTargetItem(node: HTMLElement) {
    const photo = (
      node.querySelector(USER_STAND_NAMES.idPhoto) as HTMLElement
    ).getAttribute('src') as string
    const element = (
      node.querySelector(USER_STAND_NAMES.idElement) as HTMLElement
    ).getAttribute('src') as string

    return {
      id: Number(node.dataset.id),
      name: node.dataset.name as string,
      photo,
      element,
    }
  }

  setState(newState = structuredClone(initalState)) {
    this.state = { ...this.state, ...newState }
  }

  setUserStandActiveItem(id?: number) {
    this.rootUserStandItems.forEach((node) =>
      node.classList.remove(USER_STAND_NAMES.activeStandItem)
    )

    if (id) {
      this.rootUserStandItems[id].classList.add(
        USER_STAND_NAMES.activeStandItem
      )
    }
  }

  setUserStandItemData(
    newData: InitalStandType,
    nodeIndex = this.state.activeIndex,
    isClear = false
  ) {
    const isExist = this.rootUserStandItems.find(
      (i) => i.dataset.name === newData.name
    )

    if (isExist && !isClear) return

    const nodeItem = this.rootUserStandItems[nodeIndex]
    nodeItem
      .querySelector(USER_STAND_NAMES.idPhoto)
      ?.setAttribute('src', newData.photo)
    nodeItem
      .querySelector(USER_STAND_NAMES.idElement)
      ?.setAttribute('src', newData.element)

    nodeItem.dataset.name = newData.name

    const nodeItemName = nodeItem.querySelector(
      USER_STAND_NAMES.idName
    ) as HTMLElement
    nodeItemName.textContent = newData.name
  }
}

const standMediator = new StandMediator()

export default standMediator
