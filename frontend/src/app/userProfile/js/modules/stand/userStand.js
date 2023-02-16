import { CHARACTERS_DATA_NAMES, USER_STAND_NAMES } from '../../constants'

export default class UserStand {
  #itemClassName = USER_STAND_NAMES.root_stand_item.replace('.', '')

  constructor(standMediator) {
    this.standMediator = standMediator
    this.wrapGetTargetItem = (node) =>
      standMediator.getTargetItem(node, this.#itemClassName)
  }

  #handleClickItem(event) {
    const { target } = event

    const item = this.wrapGetTargetItem(target)

    if (this.standMediator.getState().activeIndex) {
      this.standMediator.setState({
        activeIndex: item.dataset.id,
      })
      this.standMediator.setUserStandActiveItem(item.dataset.id)
    } else {
      this.standMediator.setState({
        activeIndex: item.dataset.id,
        initalStand: this.standMediator.rootUserStandItems.map(
          this.standMediator.getDataFromTargetItem
        ),
      })

      this.standMediator.setUserStandActiveItem(item.dataset.id)

      this.standMediator.animationTL
        .to(window, {
          scrollTo: { y: 0 },
        })
        .to(document.body, {
          overflow: 'hidden',
        })
        .to(
          CHARACTERS_DATA_NAMES.root,
          {
            visibility: 'visible',
            opacity: 1,
          },
          '<'
        )
        .to(
          CHARACTERS_DATA_NAMES.root,
          {
            visibility: 'visible',
            opacity: 1,
          },
          '<'
        )
        .set(CHARACTERS_DATA_NAMES.root_stand, {
          opacity: 0,
          translateX: -150,
        })
        .to(
          CHARACTERS_DATA_NAMES.root_stand,
          {
            display: 'block',
            translateX: 0,
            opacity: 1,
          },
          '<'
        )
        .to(
          this.standMediator.rootUserStand,
          {
            position: 'relative',
            zIndex: 20,
            y: -50,
          },
          '<'
        )
    }
  }

  click(e) {
    this.#handleClickItem(e)
  }
}
