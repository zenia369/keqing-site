import { CHARACTERS_DATA_NAMES } from '../../constants'

export default class CharactersStand {
  #itemClassName = CHARACTERS_DATA_NAMES.root_stand_item.replace('.', '')

  constructor(standMediator) {
    this.standMediator = standMediator
    this.wrapGetTargetItem = (node) =>
      standMediator.getTargetItem(node, this.#itemClassName)
  }

  #handleClickItem(event) {
    const { target } = event

    const item = this.wrapGetTargetItem(target)
    const itemData = this.standMediator.getDataFromTargetItem(item)
    this.standMediator.setUserStandItemData(itemData)
  }

  #handleClose() {
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
      .querySelector(CHARACTERS_DATA_NAMES.root_close_btn)
      .addEventListener('click', this.#handleClose.bind(this))
    this.standMediator.rootStand
      .querySelector(CHARACTERS_DATA_NAMES.root_submit_btn)
      .addEventListener(
        'click',
        this.standMediator.handleUpsateUserStand.bind(this.standMediator)
      )
    this.standMediator.rootStand
      .querySelector(CHARACTERS_DATA_NAMES.root_stand_list)
      .addEventListener('click', this.#handleClickItem.bind(this))
  }
}
