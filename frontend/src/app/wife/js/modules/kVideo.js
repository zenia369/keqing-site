import gsap from "gsap";

class KVideo {
  #rootBtnOpen = document.querySelector(".k-video-btn_open");
  #rootBtnClose = document.querySelector(".k-video-btn_close");
  #rootKVideo = document.querySelector(".k-video");
  #rootKVideoContent = this.#rootKVideo.querySelector(".k-video-wraper");
  #animationTL = gsap.timeline({ defaults: { duration: 0.6, ease: "none.none" } });

  #open() {
    this.#animationTL.to(this.#rootKVideo, {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "all",
    });
    this.#animationTL.to(
      this.#rootKVideoContent,
      {
        y: 0,
      },
      "<"
    );
  }
  #close() {
    this.#animationTL.to(this.#rootKVideoContent, {
      y: -100,
    });
    this.#animationTL.to(
      this.#rootKVideo,
      {
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      },
      "<"
    );
  }

  active() {
    this.#rootBtnOpen.addEventListener("click", this.#open.bind(this));
    this.#rootBtnClose.addEventListener("click", this.#close.bind(this));
  }
}

export default new KVideo();
