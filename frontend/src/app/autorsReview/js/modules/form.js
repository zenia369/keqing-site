import { KFetchV1 } from '@Lib/k-fetch'
import Reaction from './reactions'

class From {
  #rootForm = document.querySelector('.form')

  #inputEmail = this.#rootForm.querySelector('#id-email')

  #inputText = this.#rootForm.querySelector('#id-text')

  #btnSubmit = this.#rootForm.querySelector("button[type='submit']")

  #isValidForm() {
    return this.#inputEmail.validity.valid && this.#inputText.validity.valid
  }

  #handleSubmit(event) {
    event.preventDefault()
    if (this.#isValidForm()) {
      Reaction.add('progress')
      this.#btnSubmit.disabled = true
      const data = {
        email: this.#inputEmail.value,
        message: this.#inputText.value,
      }

      KFetchV1.post('author/message', data)
        .then(() => {
          Reaction.add('success')
          this.#clearForm()
        })
        .catch(() => {
          Reaction.add('error')
        })
        .finally(() => {
          this.#btnSubmit.disabled = false
        })
    }
  }

  #setBtnDisable() {
    this.#btnSubmit.disabled = !this.#isValidForm()
  }

  #clearForm() {
    this.#rootForm.reset()
  }

  active() {
    this.#rootForm.addEventListener('submit', this.#handleSubmit.bind(this))
    this.#inputEmail.addEventListener('input', this.#setBtnDisable.bind(this))
    this.#inputText.addEventListener('input', this.#setBtnDisable.bind(this))
  }
}

export default new From()
