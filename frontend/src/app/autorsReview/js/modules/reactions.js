class ReactionControl {
  #rootReaction = document.querySelector('.reaction')

  #reactionTime = 5000

  #reactions = []

  add(type = 'success' || 'error' || 'progress') {
    switch (type) {
      case 'success':
        this.#registerReaction(
          this.#rootReaction.querySelector('.success'),
          this.#reactionTime,
          true
        )
        break
      case 'error':
        this.#registerReaction(
          this.#rootReaction.querySelector('.error'),
          this.#reactionTime,
          true
        )
        break
      case 'progress':
        this.#registerReaction(
          this.#rootReaction.querySelector('.progress'),
          this.#reactionTime
        )
        break
      default:
        throw new Error('it`s missed type')
    }
  }

  #registerReaction(node, time, clearPrev = false) {
    if (clearPrev && this.#reactions.length === 1) {
      const clear = this.#reactions[0]
      this.#cleareReaction(clear.id, clear.node)
      this.#reactions = this.#reactions.slice(1)
    }

    const reaction = {
      id: crypto.randomUUID(),
      node,
      time,
      clearPrev,
    }

    this.#reactions.push(reaction)

    setTimeout(
      this.#cleareReaction.bind(this, reaction.id, reaction.node),
      time
    )

    this.#nodeToggleHidden(reaction.node)
  }

  #cleareReaction(id, node) {
    const clear = this.#reactions.find((r) => r.id === id)
    if (clear) {
      this.#reactions = this.#reactions.filter((r) => r.id !== id)
      this.#nodeToggleHidden(node)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async #nodeToggleHidden(node) {
    await node.classList.toggle('hidden')
    node.classList.toggle('active')
  }
}

export default new ReactionControl()
