type ViewObserverItemType = {
  observer: IntersectionObserver
  id: string
}

class ViewObserver {
  private observes: ViewObserverItemType[] = []

  private defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  }

  registerObserver(
    callback: IntersectionObserverCallback,
    node: HTMLElement,
    options = this.defaultOptions
  ) {
    const observer = new IntersectionObserver(callback, options)

    const newViewObserver = {
      observer,
      id: crypto.randomUUID(),
    }

    this.observes.push(newViewObserver)

    observer.observe(node)

    return newViewObserver
  }

  getRegisteredObserver(id: string) {
    return this.observes.find((o) => o.id === id) as ViewObserverItemType
  }

  unobserveByObserverId(id: string, node: HTMLElement) {
    const { observer } = this.observes.find(
      (o) => o.id === id
    ) as ViewObserverItemType

    observer.unobserve(node)
  }
}

export const viewObserver = new ViewObserver()
