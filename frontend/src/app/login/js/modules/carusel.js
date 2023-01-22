import KFetch from "@Lib/k-fetch";

class Carusel {
  #images = [];
  #interval = 5000;
  #active = false;
  #isUp = false;
  #animCount = 0;
  #animStep = 100;
  #rooInterval = undefined;
  #rooList = undefined;

  constructor(images = [], rooList) {
    this.#images = structuredClone(images);
    this.#rooList = rooList;
  }

  active() {
    this.#active = true;
    this.#rooInterval = setInterval(
      () => requestAnimationFrame(this.#animationHandler.bind(this)),
      this.#interval
    );
  }

  stop() {
    clearInterval(this.#rooInterval);
    this.#rooInterval = undefined;
    this.#active = false;
  }

  #animationHandler() {
    if (this.#isUp) {
      this.#animCount -= 1;
      this.#isUp = this.#animCount === 0 ? false : true;
    } else {
      this.#animCount += 1;
      this.#isUp = this.#animCount === this.#images.length ? true : false;
    }
    this.#rooList.style = `transform: translateY(-${this.#animCount * this.#animStep}vh);`;
  }

  getActive() {
    return this.#active;
  }
}

export const caruselActive = async () => {
  const { data } = await KFetch.get("login-images");
  const rooList = document.querySelector(".list-images");
  const carusel = new Carusel(data, rooList);

  Promise.all(
    data.map((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      return new Promise((r) => (img.onload = img.onerror = r));
    })
  )
    .then(() => {
      data.forEach((src, i) => {
        const el = document.createElement("img");
        el.classList.add("list-images__item");
        el.alt = `Keqing image ${i + 2}`;
        el.src = src;

        rooList.append(el);
      });
    })
    .then(() => {
      carusel.active();
    });
};
