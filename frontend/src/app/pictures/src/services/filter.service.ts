import { AxiosError } from 'axios'

import { createObserver } from '@Lib/k-observer'
import { KFetchV1 } from '@Lib/k-fetch'

export namespace FilterServiceTypes {
  export type RequestParam = { name: string; options: string[] }

  export type FilterItem = {
    path: string
    id: string
  }

  export type DataObserver = {
    isNextPage: boolean
    isLoading: boolean
    offset: number
    limit: number
    count: number
    items: FilterItem[]
    params: RequestParam[]
    isError: boolean
    error: Error | AxiosError | null
  }

  export type RequestResponseType = Omit<
    DataObserver,
    'isError' | 'error' | 'isLoading' | 'params'
  >
}

class FilterService {
  private dataObserver$ = createObserver<FilterServiceTypes.DataObserver>({
    isNextPage: true,
    isLoading: false,
    isError: false,
    offset: 0,
    limit: 20,
    count: 0,
    items: [],
    error: null,
    params: [],
  })

  constructor() {
    const urlData = new URLSearchParams(window.location.search)
    if (urlData.has('limit')) {
      this.dataObserver$.subject.limit = Number(urlData.get('limit'))
      urlData.delete('limit')
    }

    if (urlData.has('offset')) {
      this.dataObserver$.subject.offset = Number(urlData.get('offset'))
      urlData.delete('offset')
    }
    urlData.forEach((value, key) => {
      this.dataObserver$.subject.params.push({
        name: key,
        options: value.split(','),
      })
    })
  }

  async createRequestPagination() {
    if (!this.dataObserver$.subject.isNextPage) return
    this.dataObserver$.subject.offset = this.dataObserver$.subject.count

    try {
      const data = await this.getRequest()

      this.dataObserver$.subject.items = [
        ...this.dataObserver$.subject.items,
        ...data.items,
      ]
      this.dataObserver$.subject.isNextPage = data.isNextPage
      this.dataObserver$.subject.limit = data.limit
      this.dataObserver$.subject.offset += data.limit
      this.dataObserver$.subject.count += data.count
      this.dataObserver$.subject.isError = false
      this.dataObserver$.subject.error = null
    } catch (error: any) {
      this.dataObserver$.subject.isError = true
      this.dataObserver$.subject.error = error
    }
  }

  async createRequest() {
    try {
      const data = await this.getRequest()

      this.dataObserver$.subject.items = data.items
      this.dataObserver$.subject.isNextPage = data.isNextPage
      this.dataObserver$.subject.limit = data.limit
      this.dataObserver$.subject.count = data.count
      this.dataObserver$.subject.isError = false
      this.dataObserver$.subject.error = null
    } catch (error: any) {
      this.dataObserver$.subject.isError = true
      this.dataObserver$.subject.error = error
    }
  }

  getObserver() {
    return this.dataObserver$
  }

  getUrlSearchParams() {
    return this.normalizeParams(this.dataObserver$.subject.params)
  }

  private normalizeParams(params: FilterServiceTypes.RequestParam[]) {
    const data: {
      [index: string]: string | number
    } = {}

    params.forEach((el) => {
      data[el.name] = el.options.toString()
    })

    data.limit = this.dataObserver$.subject.limit
    data.offset = this.dataObserver$.subject.offset

    return data
  }

  private async getRequest() {
    this.dataObserver$.subject.isLoading = true

    const { data } = await KFetchV1.get<FilterServiceTypes.RequestResponseType>(
      'images/pictures',
      {
        params: this.normalizeParams(this.dataObserver$.subject.params),
      }
    )

    this.dataObserver$.subject.isLoading = false

    return data
  }
}

export default new FilterService()
