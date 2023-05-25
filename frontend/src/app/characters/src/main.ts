import '../styles/style.scss'

import { Nodes } from './constants'

import charactersService, {
  CharactersCardItemType,
  CharactersCardType,
} from './services/characters.service'

const loaderNode = document.querySelector(Nodes.rootLoader) as HTMLElement
const cardListNode = document.querySelector(Nodes.rootCardList) as HTMLElement

class CardList {
  constructor(private store = charactersService.getObserver) {
    this.store.subscribe((data) => {
      const list = [...data.images, ...data.images].map(
        this.generateCards.bind(this)
      )

      cardListNode.innerHTML = list.join('\n')

      loaderNode.style.display = 'none'

      Array.from(cardListNode.children).forEach((node) => {
        node.classList.add(Nodes.animationNameCardListItem)
      })
    })
  }

  private generateCards(card: CharactersCardType) {
    return `
      <div class="cardList-card">
        <div class="cardList-card__title">
            <p class="name-game">
              <a href="${card.game_href}" target="_blank">${card.game_name}</a>
            </p>
            <div 
              class="cardList-card__title-img" 
              style="background: url(${
                card.game_poster
              });background-repeat: no-repeat;background-size: cover;background-position-x: center;"></div>
        </div>
        <ul class="cardList-card__ul">
            ${card.items.map(this.generateCardItem).join('\n')}
        </ul>
      </div>  
    `
  }

  private generateCardItem(item: CharactersCardItemType) {
    return `
      <li class="cardList-card__ul__item" style="background: url('${item.poster}'); background-repeat: no-repeat;background-size: cover;">
        <a class="cardList-card__ul__item__link" href="${item.url}">
          <span>${item.name}</span>
        </a>
      </li>
    `
  }
}

const cardList = new CardList()
