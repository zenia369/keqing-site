import FilterFetch from './filterFetch'

class Filter {
  #rangeInput = document.querySelector('.filter_range')

  #btnActiveFilter = document.querySelector('.filter__btn button')

  #rootFilters = [...document.querySelectorAll('.filter-group-item')]

  #nameFilterItem = '.filter-group-item-option label'

  #getActiveOptions() {
    const data = []

    this.#rootFilters.forEach((el) => {
      const elementData = { name: el.dataset.name, options: [] }

      const options = Array.from(el.querySelectorAll(this.#nameFilterItem))

      options.forEach((optionEl) => {
        if (optionEl.children[0].checked) {
          elementData.options.push(optionEl.parentElement.dataset.option)
        }
      })

      if (elementData.options.length) data.push(elementData)
    })

    return data
  }

  #getActiveLimit() {
    return Number(this.#rangeInput.value) ?? 20
  }

  async #handleClickFilter() {
    const data = this.#getActiveOptions()
    const limit = this.#getActiveLimit()

    window.scrollTo({ top: 0, behavior: 'smooth' })

    FilterFetch.toggleLoadingStatus()
    await FilterFetch.createRequest(data, limit)
    FilterFetch.toggleLoadingStatus()
  }

  async pagination() {
    const data = this.#getActiveOptions()
    const limit = this.#getActiveLimit()

    FilterFetch.toggleLoadingStatus()
    const resPagination = await FilterFetch.createPagination(data, limit)
    FilterFetch.toggleLoadingStatus()

    return resPagination
  }

  active() {
    this.#btnActiveFilter.addEventListener(
      'click',
      this.#handleClickFilter.bind(this)
    )
  }
}

export default new Filter()
