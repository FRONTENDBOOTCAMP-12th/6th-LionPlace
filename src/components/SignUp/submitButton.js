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
        height: 5vh;
        margin-top: 3rem;
        padding: 1rem;
        background-color: white;
        border: none;
        border-radius: 6px;
        color: #1a1f2e;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
      }

      button[disabled] {
        background-color: #f0f0f0;
        color: gray;
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
