import { LitElement, html, css } from 'lit';
import resetStyles from '@/styles/reset.js';

class SubmitButton extends LitElement {
  static properties = {
    disabled: { type: Boolean },
    text: { type: String },
  };

  static styles = [
    resetStyles,
    css`
      button {
        width: 100%;
        margin-top: 2rem;
        padding: 1rem;
        background-color: var(--white);
        border: none;
        border-radius: 6px;
        color: var(--blue--900);
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
      }

      button[disabled] {
        background-color: var(--gray--50);
        color: var(--gray--500);
        cursor: not-allowed;
      }
    `,
  ];

  render() {
    return html`
      <button type="submit" ?disabled="${this.disabled}" @click="${this._handleClick}">
        ${this.text}
      </button>
    `;
  }

  _handleClick(e) {
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent('submit-click', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }
}

customElements.define('submit-button', SubmitButton);
