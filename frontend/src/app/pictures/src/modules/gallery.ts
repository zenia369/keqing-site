import { viewObserver } from '@Lib/k-view-observer'

import filterService, { FilterServiceTypes } from '../services/filter.service'

import { CommonNodes } from '../constants'

class Gallery {
  private galleryPagination = document.querySelector(
    CommonNodes.galleryPagination
  ) as HTMLElement

  private gallery = document.querySelector(CommonNodes.gallery) as HTMLElement

  constructor(private service: typeof filterService) {
    this.service.getObserver().subject.items = this.getDataFromGalleryList()
    this.service.getObserver().subscribe(
      ({ items }) => {
        if (items.length) {
          this.appendNodes(items)
        }
      },
      ['items']
    )
    window.addEventListener('load', () => {
      viewObserver.registerObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              this.service.createRequestPagination()
            }
            if (!this.service.getObserver().subject.isNextPage) {
              this.galleryPagination.classList.add(
                CommonNodes.galleryPaginationActiveClass
              )
            } else {
              this.galleryPagination.classList.remove(
                CommonNodes.galleryPaginationActiveClass
              )
            }
          })
        },
        this.galleryPagination,
        {
          rootMargin: '50px',
          threshold: 0.4,
        }
      )
    })
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

  private getDataFromGalleryList() {
    const data: FilterServiceTypes.FilterItem[] = []
    const nodesImg = [...this.gallery.children]
    nodesImg.forEach((node) => {
      data.push({
        path: node.getAttribute('src') as string,
        id: node.getAttribute('alt') as string,
      })
    })
    return data
  }
}

const gallery = new Gallery(filterService)
export default gallery
