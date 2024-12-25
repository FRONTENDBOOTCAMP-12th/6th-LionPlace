import { LitElement, html, css } from 'lit';
import resetStyles from '@/styles/reset.js';

class ActionButton extends LitElement {
  static properties = {
    text: { type: String },
    onClick: { type: Function },
  };

  static styles = [
    resetStyles,
    css`
      button {
        width: 100%;
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--white);
        border: none;
        border-radius: 6px;
        color: #1a1f2e;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
      }
    `,
  ];

  render() {
    return html` <button @click="${this.onClick}">${this.text}</button> `;
  }
}

customElements.define('action-button', ActionButton);
