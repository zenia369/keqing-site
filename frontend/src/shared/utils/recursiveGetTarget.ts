function recursiveGetTarget(node: HTMLElement, query: string): HTMLElement {
  if (node.tagName === 'BODY' || !node || !query.length) {
    return document.body
  }

  if (node.classList.contains(query)) {
    return node
  }

  return recursiveGetTarget(node.parentElement as HTMLElement, query)
}

export default recursiveGetTarget
