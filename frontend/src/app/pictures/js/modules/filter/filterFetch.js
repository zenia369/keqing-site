/* eslint-disable max-classes-per-file */

import KFetch from '@Lib/k-fetch'

class AppendImages {
  #gallery = document.querySelector('.gallery')

  appendNodes(images = []) {
    const nodeImages = [...this.#gallery.children]

    if (nodeImages.length >= images.length) {
      nodeImages.forEach((node, i) => {
        if (images[i]) {
          this.#setNodeData(node, images[i].path, images[i].id)
        } else setTimeout(() => node.remove(), 0)
      })
    } else {
      for (let i = 0; i < images.length; i += 1) {
        const node = nodeImages[i]

        if (nodeImages[i]) {
          this.#setNodeData(node, images[i].path, images[i].id)
        } else {
          this.smartAppendNodes(images.slice(i))
          break
        }
      }
    }
  }

  smartAppendNodes(images = []) {
    const nodesImg = [...this.#gallery.children]
    let lastNode = nodesImg[nodesImg.length - 1]

    images.forEach((data) => {
      const img = document.createElement('img')
      this.#setNodeData(img, data.path, data.id)
      lastNode.insertAdjacentElement('afterend', img)
      lastNode = img
    })
  }

  // eslint-disable-next-line class-methods-use-this
  #setNodeData(node, path, id) {
    // eslint-disable-next-line no-param-reassign
    node.src = path
    // eslint-disable-next-line no-param-reassign
    node.id = `Teyvat picture by id:${id}`
  }
}

class FilterFetch extends AppendImages {
  #offset = 20

  #limit = 20

  #optionsData = []

  #isNextPage = true

  #rootLoading = document.querySelector('.loader-wrapper')

  async createRequest(data = [], limit = 20) {
    this.#limit = limit
    this.#offset = 0
    this.#optionsData = data

    const params = this.#generateParams(data)
    const resData = await this.#fetchItems(params)

    await this.appendNodes(resData.items)
  }

  async createPagination(data = this.#optionsData, limit = 20) {
    if (!this.#isNextPage) return this.#isNextPage
    this.#limit = limit

    const params = this.#generateParams(data)
    const resData = await this.#fetchItems(params)

    await this.smartAppendNodes(resData?.items ?? [])
    return resData ? true : resData
  }

  toggleLoadingStatus() {
    this.#rootLoading.classList.toggle('loader-wrapper-active')
  }

  #generateParams(data) {
    const params = {}

    data.forEach((el) => {
      params[el.name] = el.options.toString()
    })

    params.limit = this.#limit
    params.offset = this.#offset

    return params
  }

  async #fetchItems(params) {
    try {
      const { data } = await KFetch.get('pictures', {
        params,
      })

      this.#moveOffset()
      this.#isNextPage = data.isNextPage

      return data
    } catch (error) {
      return null
    }
  }

  #moveOffset() {
    this.#offset += this.#limit
  }
}

export default new FilterFetch()
