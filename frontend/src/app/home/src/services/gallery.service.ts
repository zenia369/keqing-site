import { KFetchV1 } from '@Lib/k-fetch'
import { createObserver } from '@Lib/k-observer'

class GalleryService {
  private data$ = createObserver<{
    images: string[]
  }>({
    images: [],
  })

  constructor() {
    this.get()
  }

  private async get() {
    const { data } = await KFetchV1.get<{ images: string[] }>('images')
    this.data$.subject.images = data.images
  }

  getSubscription() {
    return this.data$.subscribe
  }
}

export default new GalleryService()
