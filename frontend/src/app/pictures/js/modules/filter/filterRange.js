class InputRange {
  #rangeInput = document.querySelector('.filter_range')

  #rangeViewValue = document.querySelector('.filter_range_value')

  #setValue(value) {
    this.#rangeViewValue.innerHTML = value
  }

  #catchChangeEvent(event) {
    const { value } = event.target

    this.#setValue(value)
  }

  active() {
    this.#rangeInput.addEventListener(
      'input',
      this.#catchChangeEvent.bind(this)
    )
  }
}

export default new InputRange()
