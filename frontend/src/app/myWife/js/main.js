/* eslint-disable max-classes-per-file */

// IMPORTs
import '../styles/style.scss'

// END IMPORT
import { KFetchV1 } from '@Lib/k-fetch'

class Loader {
  #root = document.getElementById('loader')

  hidde() {
    this.#root.style.display = 'none'
  }
}
const loader = new Loader()

class Listcards {
  #rootlist = document.querySelector('.cardList')

  async #fetch() {
    const { data } = await KFetchV1.get('images/characters')

    this.#createlist(data.images)
  }

  #createlist(list = []) {
    const crearedlist = list.map(this.#generatecard.bind(this)).join('\n')

    this.#rootlist.innerHTML = crearedlist

    loader.hidde()

    // eslint-disable-next-line no-restricted-syntax
    for (const card of this.#rootlist.children) {
      card.classList.add('animation-item')
    }
  }

  #generatecard(card) {
    return `
      <div class="cardList-card">
          <div class="cardList-card__title">
              <p class="name-game"><a href="${
                card.game_href
              }" target="_blank">${card.game_name}</a></p>
              <div class="cardList-card__title-img" style="background: url(${
                card.game_poster
              });background-repeat: no-repeat;background-size: cover;background-position-x: center;"></div>
          </div>
          <ul class="cardList-card__ul">
              ${card.items.map(this.#generateitem).join('\n')}
          </ul>
      </div>  
    `
  }

  // eslint-disable-next-line class-methods-use-this
  #generateitem(item) {
    return `
      <li class="cardList-card__ul__item" style="background: url('${item.poster}'); background-repeat: no-repeat;background-size: cover;">
        <a class="cardList-card__ul__item__link" href="${item.url}">
          <span>${item.name}</span>
        </a>
      </li>
    `
  }

  active() {
    this.#fetch()
  }
}

const listcards = new Listcards()
listcards.active()
