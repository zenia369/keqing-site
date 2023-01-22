import { login, resetPassword, google } from "./fetchAuth";
import showMessage from "./showMessage";

class Form {
  #rootForm = document.querySelector("#form");
  #rootEmail = this.#rootForm.querySelector("#email");
  #rootPassword = this.#rootForm.querySelector("#password");
  #rootBtnSubmit = this.#rootForm.querySelector("button[type='submit']");
  #rootReset = document.querySelector(".content__another__reset");
  #rootBtnReset = document.querySelector(".content__another__reset button");
  #rootBtnGoogle = document.querySelector("#google");
  #rootReaction = document.querySelector(".content__reaction");

  toggleBtnDisabled() {
    this.#rootBtnSubmit.disabled = !this.#rootBtnSubmit.disabled;
  }
  toggleReaction() {
    this.#rootReaction.classList.toggle("active");
  }

  async #handleSubmit(event) {
    event.preventDefault();
    this.toggleBtnDisabled();
    const email = this.#rootEmail.value;
    const password = this.#rootPassword.value;
    try {
      const uid = await login(email, password);
      this.#rootForm.reset();
      this.#redirect(uid);
      this.toggleReaction();
    } catch (error) {
      showMessage(error.message ?? "some error with submit");
      this.#rootReset.classList.remove("hidden");
    }
    this.toggleBtnDisabled();
  }

  async #handleReset() {
    const email = this.#rootEmail.value;

    try {
      await resetPassword(email);
      showMessage("check your email and spam");
    } catch (error) {
      showMessage(error.message ?? "some error with reset");
    }
  }

  async #handleSubmitGoogle() {
    this.toggleBtnDisabled();
    try {
      const uid = await google();
      this.#redirect(uid);
      this.toggleReaction();
    } catch (error) {
      showMessage(error.message ?? "some error with google submit");
    }
    this.toggleBtnDisabled();
  }

  #redirect(uid) {
    const to =
      new URLSearchParams(window.location.search.replace("?", "")).get("continuePath") ?? "/";
    setTimeout(() => {
      window.location.assign(`${to}?uid=${uid}`);
    }, 1000);
  }

  active() {
    this.#rootForm.addEventListener("submit", this.#handleSubmit.bind(this));
    this.#rootBtnReset.addEventListener("click", this.#handleReset.bind(this));
    this.#rootBtnGoogle.addEventListener("click", this.#handleSubmitGoogle.bind(this));
  }
}

export default new Form();
