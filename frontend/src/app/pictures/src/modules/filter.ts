import recursiveGetTarget from '@Util/recursiveGetTarget'

import filterService from '../services/filter.service'

import { FilterNodes } from '../constants'

class FilterComponent {
  private options = document.querySelector(FilterNodes.options) as HTMLElement

  private submitBtnValue = document.querySelector(
    FilterNodes.submitBtnMarkerValue
  ) as HTMLElement

  private submitBtn = document.querySelector(
    FilterNodes.submitBtn
  ) as HTMLElement

  private range = document.querySelector(FilterNodes.range) as HTMLElement

  private rangeValue = document.querySelector(
    FilterNodes.rangeValue
  ) as HTMLElement

  constructor(private service: typeof filterService) {
    this.service.getObserver().subscribe((data) => {
      const countOption = data.params.reduce(
        (acc, p) => acc + p.options.length,
        0
      )

      if (countOption) {
        this.submitBtnValue.classList.remove('hidden')
        this.submitBtnValue.innerText = String(countOption)
      } else {
        this.submitBtnValue.classList.add('hidden')
      }

      window.history.pushState(
        null,
        '',
        `?${new URLSearchParams(
          this.service.getUrlSearchParams() as any
        ).toString()}`
      )

      this.rangeValue.innerText = String(data.limit)
    })
  }

  active() {
    this.options.addEventListener('click', this.activeOptions.bind(this))
    this.range.addEventListener('input', this.activeRange.bind(this))
    this.submitBtn.addEventListener('click', this.activeSubmitBtn.bind(this))
  }

  private activeOptions(e: any) {
    if (e.pointerType !== 'mouse') return
    const option = recursiveGetTarget(
      e.target,
      FilterNodes.optionsBtn.replace('.', '')
    ).dataset.option as string
    const category = recursiveGetTarget(
      e.target,
      FilterNodes.optionsCategory.replace('.', '')
    ).dataset.name as string

    if (!option || !category) return

    const getCategory = this.service
      .getObserver()
      .subject.params.find((p) => p.name === category)
    const isOption = getCategory?.options.includes(option)

    if (getCategory && !isOption) {
      getCategory.options.push(option)
    } else if (!getCategory) {
      this.service.getObserver().subject.params.push({
        name: category,
        options: [option],
      })
    } else if (getCategory && isOption) {
      getCategory.options = getCategory.options.filter((o) => o !== option)
      if (!getCategory.options.length) {
        this.service.getObserver().subject.params = this.service
          .getObserver()
          .subject.params.filter((c) => category !== c.name)
      }
    }

    this.service.getObserver().subject.offset = 0
  }

  private activeRange({ target }: Event) {
    if (target) {
      this.service.getObserver().subject.limit = Number(
        (target as HTMLInputElement).value
      )
      this.service.getObserver().subject.offset = 0
    }
  }

  private activeSubmitBtn(e: Event) {
    this.service.createRequest()
  }
}

const filterComponent = new FilterComponent(filterService)
filterComponent.active()
export default filterComponent
