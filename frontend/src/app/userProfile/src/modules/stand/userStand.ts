// eslint-disable-next-line import/no-cycle
import { StandMediatorType } from './standMediator'
import { CHARACTERS_DATA_NAMES, USER_STAND_NAMES } from '../../constants'

export default class UserStand {
  private itemClassName = USER_STAND_NAMES.rootStandItem.replace('.', '')

  private standMediator!: StandMediatorType

  private wrapGetTargetItem!: (node: HTMLElement) => HTMLElement

  constructor(standMediator: StandMediatorType) {
    this.standMediator = standMediator
    this.wrapGetTargetItem = (node: HTMLElement) =>
      standMediator.getTargetItem(node, this.itemClassName)
  }

  private handleClickItem(event: Event) {
    const target = event.target as HTMLElement

    const item = this.wrapGetTargetItem(target)

    if (Number.isInteger(this.standMediator.getState().activeIndex)) {
      this.standMediator.setState({
        activeIndex: Number(item.dataset.id),
      })
      this.standMediator.setUserStandActiveItem(Number(item.dataset.id))
    } else {
      this.standMediator.setState({
        activeIndex: Number(item.dataset.id),
        initalStand: this.standMediator.rootUserStandItems.map(
          this.standMediator.getDataFromTargetItem
        ),
      })

      this.standMediator.setUserStandActiveItem(Number(item.dataset.id))

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
        .set(CHARACTERS_DATA_NAMES.rootStand, {
          opacity: 0,
          translateX: -150,
        })
        .to(
          CHARACTERS_DATA_NAMES.rootStand,
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

  click(e: Event) {
    this.handleClickItem(e)
  }
}
