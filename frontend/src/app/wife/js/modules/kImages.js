import gsap from "gsap";
import extractUrlParams from "@Util/extractUrlParams";
import KFetch from "@Lib/k-fetch";
import showMessage from "./message";

class KImages {
  #rootBtnOpen = document.querySelector(".k-images-btn_open");
  #rootBtnClose = document.querySelector(".k-images-btn_close");
  #rootKImages = document.querySelector(".k-images");
  #rootKImagesList = this.#rootKImages.querySelector(".k-images-list");
  #animationTL = gsap.timeline({ defaults: { duration: 0.6, ease: "none.none" } });

  #close() {
    this.#animationTL.to(this.#rootKImages, {
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
    });
    this.#animationTL.to(
      this.#rootKImagesList,
      {
        y: 100,
      },
      "<"
    );
  }
  #open() {
    this.#animationTL.to(this.#rootKImages, {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "all",
    });
    this.#animationTL.to(
      this.#rootKImagesList,
      {
        y: 0,
      },
      "<"
    );
  }

  async #handleAddToFavorite(event) {
    const target = this.#searchFavoriteButton(event.target);
    const uid = extractUrlParams().get("uid");

    if (!target || !uid) return;

    try {
      const res = await KFetch.put("wife/addFavoritePhoto", {
        uid,
        bigLink: target.dataset.biglink,
        link: target.dataset.link,
      });

      showMessage(res.status, res.data.message);
    } catch (error) {
      showMessage(error.status, error.message);
    }
  }

  #searchFavoriteButton(target) {
    if (target.classList.contains("k-images-list-item")) {
      return null;
    }

    if (!target.classList.contains("k-images-list-item-favorite")) {
      return this.#searchFavoriteButton(target.parentElement);
    }

    return target;
  }

  active() {
    this.#rootBtnOpen.addEventListener("click", this.#open.bind(this));
    this.#rootBtnClose.addEventListener("click", this.#close.bind(this));
    this.#rootKImagesList.addEventListener("click", this.#handleAddToFavorite.bind(this));
  }
}

export default new KImages();
