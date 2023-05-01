import filterService, { FilterServiceTypes } from '../services/filter.service'

import { CommonNodes } from '../constants'

class Gallery {
  private gallery = document.querySelector(CommonNodes.gallery) as HTMLElement

  constructor(private store: typeof filterService) {
    this.store.getObserver().subscribe(
      ({ items }) => {
        if (items.length) {
          this.appendNodes(items)
        }
      },
      ['items']
    )
  }

  appendNodes(images: FilterServiceTypes.FilterItem[]) {
    const nodeImages = [...this.gallery.children] as HTMLImageElement[]

    if (nodeImages.length >= images.length) {
      nodeImages.forEach((node, i) => {
        if (images[i]) {
          this.setNodeData(node, images[i].path, images[i].id)
        } else setTimeout(() => node.remove(), 0)
      })
    } else {
      for (let i = 0; i < images.length; i += 1) {
        const node = nodeImages[i]

        if (nodeImages[i]) {
          this.setNodeData(node, images[i].path, images[i].id)
        } else {
          this.smartAppendNodes(images.slice(i))
          break
        }
      }
    }
  }

  smartAppendNodes(images: FilterServiceTypes.FilterItem[]) {
    const nodesImg = [...this.gallery.children]
    let lastNode = nodesImg[nodesImg.length - 1]

    images.forEach((data) => {
      const img = document.createElement('img')
      this.setNodeData(img, data.path, data.id)
      lastNode.insertAdjacentElement('afterend', img)
      lastNode = img
    })
  }

  // eslint-disable-next-line class-methods-use-this
  private setNodeData(node: HTMLImageElement, src: string, id: string) {
    node.setAttribute('src', src)
    node.setAttribute('alt', `Teyvat picture by id:${id}`)
  }
}

const gallery = new Gallery(filterService)
export default gallery
