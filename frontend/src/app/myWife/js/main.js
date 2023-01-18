//to-do rename variables - broken shift key

//IMPORTs
import "../styles/style.scss";

//END IMPORT
import KFetch from "@Lib/k-fetch";

class Loader {
  #root = document.getElementById("loader");

  hidde() {
    this.#root.style.display = "none";
  }
}
const loader = new Loader();

class Listcards {
  #rootlist = document.querySelector(".cardList");

  async #fetch() {
    const { data } = await KFetch.get("myWife");

    this.#createlist(data);
  }

  #createlist(list = []) {
    const crearedlist = list.map(this.#generatecard.bind(this)).join("\n");

    this.#rootlist.innerHTML = crearedlist;

    loader.hidde();

    for (const card of this.#rootlist.children) {
      card.classList.add("animation-item");
    }
  }

  #generatecard(card) {
    return `
        <div class="cardList-card">
            <div class="cardList-card__title">
                <p class="name-game"><a href="${card["game-href"]}" target="_blank">${
      card["name-game"]
    }</a></p>
                <div class="cardList-card__title-img" style="background: url(${
                  card["game-img"]
                });background-repeat: no-repeat;background-size: cover;background-position-x: center;"></div>
            </div>
            <ul class="cardList-card__ul">
                ${card.items.map(this.#generateitem).join("\n")}
            </ul>
        </div>  
    `;
  }

  #generateitem(item) {
    return `
    <li class="cardList-card__ul__item" style="background: url('${item.backgraundURL}'); background-repeat: no-repeat;background-size: cover;">
      <a class="cardList-card__ul__item__link" href="${item.pageURL}">
        <span>${item.pageName}</span>
      </a>
    </li>
`;
  }

  active() {
    this.#fetch();
  }
}

const listcards = new Listcards();
listcards.active();
