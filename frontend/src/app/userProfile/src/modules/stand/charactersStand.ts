// eslint-disable-next-line import/no-cycle
import { StandMediatorType } from './standMediator'
import { CHARACTERS_DATA_NAMES } from '../../constants'

export default class CharactersStand {
  private itemClassName = CHARACTERS_DATA_NAMES.rootStandItem.replace('.', '')

  private standMediator!: StandMediatorType

  private wrapGetTargetItem!: (node: HTMLElement) => HTMLElement

  constructor(standMediator: StandMediatorType) {
    this.standMediator = standMediator
    this.wrapGetTargetItem = (node) =>
      standMediator.getTargetItem(node, this.itemClassName)
  }

  private handleClickItem(event: Event) {
    const target = event.target as HTMLElement

    if ((event.currentTarget as HTMLElement).isEqualNode(target)) return

    const item = this.wrapGetTargetItem(target)
    const itemData = this.standMediator.getDataFromTargetItem(item)
    this.standMediator.setUserStandItemData(itemData)
  }

  private handleClose() {
    this.standMediator.rootUserStandItems.forEach((_, idx) =>
      this.standMediator.setUserStandItemData(
        this.standMediator.getState().initalStand[idx],
        idx,
        true
      )
    )
    this.standMediator.handleReverseAnimation()
  }

  active() {
    this.standMediator.rootStand
      .querySelector(CHARACTERS_DATA_NAMES.rootCloseBtn)
      ?.addEventListener('click', this.handleClose.bind(this))
    this.standMediator.rootStand
      .querySelector(CHARACTERS_DATA_NAMES.rootSubmitBtn)
      ?.addEventListener(
        'click',
        this.standMediator.handleUpsateUserStand.bind(this.standMediator)
      )
    this.standMediator.rootStand
      .querySelector(CHARACTERS_DATA_NAMES.rootStandList)
      ?.addEventListener('click', this.handleClickItem.bind(this))
  }
}
