class FilterWatcher {
  #filterSubmitBtn = document.querySelector('.filter__btn button')

  #filterBtnMarker = document.querySelector('.filter__btn__marker')

  #filterItems = [...document.querySelectorAll('.filter-group-item-option')]

  #activeCount = []

  #clickHandler(event) {
    event.stopPropagation()
    if (event.pointerId < 0) return
    const { option } = event.currentTarget.dataset

    if (this.#activeCount.includes(option)) {
      this.#activeCount = this.#activeCount.filter((el) => el !== option)
    } else {
      this.#activeCount.push(option)
    }

    this.#changeBtnValue()
  }

  #changeBtnValue() {
    if (!this.#activeCount.length) this.#filterBtnMarker.classList.add('hidden')
    else this.#filterBtnMarker.classList.remove('hidden')

    this.#filterBtnMarker.innerText = this.#activeCount.length
  }

  #clearActiveCount() {
    this.#activeCount = []
    this.#changeBtnValue()
    this.#getActiveOptions()
  }

  #getActiveOptions() {
    this.#filterItems.forEach((node) => {
      const { option } = node.dataset

      if (node.children[0].children[0].checked) {
        this.#activeCount.push(option)
      }
    })
  }

  active() {
    this.#filterItems.forEach((node) => {
      node.addEventListener('click', this.#clickHandler.bind(this))
    })
    this.#filterSubmitBtn.addEventListener(
      'click',
      this.#clearActiveCount.bind(this)
    )
  }
}

export default new FilterWatcher()
