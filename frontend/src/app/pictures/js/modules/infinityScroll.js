import Filter from './filter/filter'

class InfinityScroll {
  #isLoading = false

  #throttleTime = 1000

  // eslint-disable-next-line class-methods-use-this
  #throttle(callee, timeout) {
    let timer = null

    return function perform(...args) {
      if (timer) return

      timer = setTimeout(() => {
        callee(...args)

        clearTimeout(timer)
        timer = null
      }, timeout)
    }
  }

  async #checkPosition() {
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight

    const scrolled = window.scrollY

    const threshold = height - screenHeight / 4

    const position = scrolled + screenHeight

    if (position >= threshold && !this.#isLoading) {
      this.#isLoading = true

      await Filter.pagination()

      this.#isLoading = false
    }
  }

  active() {
    window.addEventListener(
      'scroll',
      this.#throttle(this.#checkPosition.bind(this), this.#throttleTime)
    )
  }
}

export default new InfinityScroll()
