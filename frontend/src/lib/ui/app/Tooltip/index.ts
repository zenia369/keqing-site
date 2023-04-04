import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { cache } from 'lit/directives/cache.js'

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
  private _click = true

  @property()
  text!: string

  render() {
    return html`
      <div @mouseenter=${this.onClick} @mouseleave=${this.onClick}>
        ${cache(
          this._click
            ? html`<slot></slot>`
            : html`
                <slot></slot>
                <p>${this.text}</p>
              `
        )}
      </div>
    `
  }

  private onClick() {
    this._click = !this._click
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kq-tooltip': KQTooltip
  }
}
