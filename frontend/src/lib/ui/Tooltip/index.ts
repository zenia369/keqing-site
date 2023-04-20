import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('kq-tooltip')
export class KQTooltip extends LitElement {
  static styles = css`
    div {
      position: relative;
    }
    p {
      position: absolute;
      font-size: 10px;
      text-align: center;
      transform: translate(-50%, 50%);
      left: 50%;
      top: 50%;
      padding: 5px;
      background: var(--kq-purple-8);
      white-space: pre;
      border-radius: 10px;
    }
  `

  @state()
  private show = false

  @property()
  text!: string

  render() {
    return html`
      <div @mouseenter=${this.onHover} @mouseleave=${this.onHover}>
        <slot></slot>
        <p ?hidden=${!this.show}>${this.text}</p>
      </div>
    `
  }

  private onHover() {
    this.show = !this.show
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kq-tooltip': KQTooltip
  }
}
