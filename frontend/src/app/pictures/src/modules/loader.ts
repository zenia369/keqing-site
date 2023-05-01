import filterService from '../services/filter.service'

import { CommonNodes } from '../constants'

export class Loader {
  private loader = document.querySelector(CommonNodes.loader) as HTMLElement

  constructor(private store: typeof filterService) {
    store.getObserver().subscribe(
      ({ isLoading }) => {
        if (isLoading) {
          this.loader.classList.add(CommonNodes.loaderActiveClass)
        } else {
          this.loader.classList.remove(CommonNodes.loaderActiveClass)
        }
      },
      ['isLoading']
    )
  }
}

export default new Loader(filterService)
