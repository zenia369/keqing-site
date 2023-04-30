import { KFetchV1 } from '@Lib/k-fetch'
import Reaction from './reactions'

class From {
  private rootForm = document.querySelector('.form') as HTMLFormElement

  private inputEmail = this.rootForm.querySelector(
    '#id-email'
  ) as HTMLInputElement

  private inputText = this.rootForm.querySelector(
    '#id-text'
  ) as HTMLInputElement

  private btnSubmit = this.rootForm.querySelector(
    "button[type='submit']"
  ) as HTMLButtonElement

  private isValidForm() {
    return this.inputEmail.validity.valid && this.inputText.validity.valid
  }

  private handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    if (this.isValidForm()) {
      Reaction.add('progress')
      this.btnSubmit.disabled = true
      const data = {
        email: this.inputEmail.value,
        message: this.inputText.value,
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
          this.btnSubmit.disabled = false
        })
    }
  }

  #setBtnDisable() {
    this.btnSubmit.disabled = !this.isValidForm()
  }

  #clearForm() {
    this.rootForm.reset()
  }

  active() {
    this.rootForm.addEventListener('submit', this.handleSubmit.bind(this))
    this.inputEmail.addEventListener('input', this.#setBtnDisable.bind(this))
    this.inputText.addEventListener('input', this.#setBtnDisable.bind(this))
  }
}

const form = new From()
form.active()
