import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import cancelIcon from '@Public/kq-icon-cancel-circle.svg'
import errorIcon from '@Public/kq-icon-error.svg'
import warningIcon from '@Public/kq-icon-warning.svg'
import successIcon from '@Public/kq-icon-success.svg'
import messageIcon from '@Public/kq-icon-message.svg'

import { MessageType, QueueType } from './message.models'

const styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  :host {
    max-width: 500px;
    max-height: 300px;
    display: block;
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0);
  }

  .wrapper {
    background: var(--kq-purple-8);
    padding: 10px !important;
    border-radius: 5px;
    display: flex;
    gap: 5px;
    justify-content: space-between;
    align-items: center;
    color: var(--kq-white);
    animation: 0.3s ease-in-out animation;
  }

  .wrapper-hidden {
    animation: 0.3s ease-in-out animation-reverse;
    opacity: 0;
    transform: translateY(-100px);
    visibility: hidden;
  }

  .wrapper__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .wrapper__content__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
  }

  .wrapper__content__head__title,
  .wrapper__content__head__count {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .wrapper__content__head__count {
    background: var(--kq-white-t-35);
    padding: 3px;
    border-radius: 5px;
  }

  .wrapper__content__head__title img {
    width: 30px;
    height: 30px;
  }

  .wrapper__content__head__count img {
    width: 20px;
    height: 20px;
  }

  button {
    background: transparent;
    border: none;
    display: flex;
    cursor: pointer;
    width: 30px;
    height: 30px;
    transition: 0.3s ease scale;
  }

  button:hover {
    scale: 0.8;
  }

  button img {
    width: 100%;
    height: 100%;
  }

  @keyframes animation-reverse {
    from {
      opacity: 1;
      transform: translateY(0px);
      visibility: visible;
    }
    to {
      opacity: 0;
      transform: translateY(-100px);
      visibility: hidden;
    }
  }

  @keyframes animation {
    from {
      opacity: 0;
      transform: translateY(-100px);
      visibility: hidden;
    }
    to {
      opacity: 1;
      transform: translateY(0px);
      visibility: visible;
    }
  }
`

@customElement('kq-message')
export class KQMessage extends LitElement {
  static styles = [styles]

  @property()
  push = (arg: QueueType) => {
    this.pushNewItem(arg)
    this.requestUpdate()
  }

  @state()
  private queue: QueueType[] = []

  @state()
  private show = Boolean(this.queue.length)

  @state()
  private activeQueue: QueueType = this.queue[0]

  render() {
    if (!this.activeQueue) return html``

    const messageType = this.selectTypeMessage(this.activeQueue.type)
    return html`
      <div
        role="alert"
        class=${this.show ? 'wrapper' : 'wrapper wrapper-hidden'}
      >
        <div class="wrapper__content">
          <div
            class="wrapper__content__head"
            style="background: ${messageType.background};"
          >
            <div class="wrapper__content__head__title">
              <img src="${messageType.icon}" alt="message type icon" />
              <p>${messageType.name}</p>
            </div>
            ${this.queue.length > 1
              ? html`
                  <div class="wrapper__content__head__count">
                    <img src="${messageIcon}" alt="message icon" />
                    <p>${this.queue.length}</p>
                  </div>
                `
              : ''}
          </div>
          <p>${this.activeQueue.text}</p>
        </div>
        <button @click=${this.onClick}>
          <img src=${cancelIcon} alt="message cancel button" />
        </button>
      </div>
    `
  }

  private onClick() {
    this.clearQueueItem(this.activeQueue.id)
  }

  private selectTypeMessage(type: MessageType) {
    switch (type) {
      case 'error':
        return {
          name: 'Error',
          background: 'var(--kq-red)',
          icon: errorIcon,
        }
      case 'success':
        return {
          name: 'Success',
          background: 'var(--kq-green)',
          icon: successIcon,
        }
      case 'warning':
        return {
          name: 'Warning',
          background: 'var(--kq-blue)',
          icon: warningIcon,
        }
      default:
        throw new Error(`(kq-message) Unexpected type: ${type}`)
    }
  }

  private pushNewItem(item: QueueType) {
    if (this.queue.length) {
      this.queue.push(item)
    } else {
      this.queue.push(item)
      this.activeQueue = item
      setTimeout(() => this.clearQueueItem(item.id), item.time)
    }
  }

  private clearQueueItem(id: string) {
    this.queue = this.queue.filter((q) => q.id !== id)
    if (this.queue.length) {
      // eslint-disable-next-line prefer-destructuring
      this.activeQueue = this.queue.find((q) => q.isForce) ?? this.queue[0]
      setTimeout(
        () => this.clearQueueItem(this.activeQueue.id),
        this.activeQueue.time
      )
    }
  }

  protected willUpdate(): void {
    this.show = Boolean(this.queue.length)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kq-message': KQMessage
  }
}
