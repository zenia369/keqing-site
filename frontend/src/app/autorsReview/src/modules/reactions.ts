type ReactionItem = {
  id: string
  node: HTMLElement
  time: number
  clearPrev: boolean
}

class ReactionControl {
  private rootReaction = document.querySelector('.reaction') as HTMLElement

  private reactionTime = 5000

  private reactions: ReactionItem[] = []

  add(type: 'success' | 'error' | 'progress') {
    switch (type) {
      case 'success':
        this.registerReaction(
          this.rootReaction.querySelector('.success') as HTMLElement,
          this.reactionTime,
          true
        )
        break
      case 'error':
        this.registerReaction(
          this.rootReaction.querySelector('.error') as HTMLElement,
          this.reactionTime,
          true
        )
        break
      case 'progress':
        this.registerReaction(
          this.rootReaction.querySelector('.progress') as HTMLElement,
          this.reactionTime
        )
        break
      default:
        throw new Error('it`s missed type')
    }
  }

  private registerReaction(node: HTMLElement, time: number, clearPrev = false) {
    if (clearPrev && this.reactions.length === 1) {
      const clear = this.reactions[0]
      this.cleareReaction(clear.id, clear.node)
      this.reactions = this.reactions.slice(1)
    }

    const reaction = {
      id: crypto.randomUUID(),
      node,
      time,
      clearPrev,
    }

    this.reactions.push(reaction)

    setTimeout(this.cleareReaction.bind(this, reaction.id, reaction.node), time)

    this.nodeToggleHidden(reaction.node)
  }

  private cleareReaction(id: string, node: HTMLElement) {
    const clear = this.reactions.find((r) => r.id === id)
    if (clear) {
      this.reactions = this.reactions.filter((r) => r.id !== id)
      this.nodeToggleHidden(node)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async nodeToggleHidden(node: HTMLElement) {
    await node.classList.toggle('hidden')
    node.classList.toggle('active')
  }
}

export default new ReactionControl()
