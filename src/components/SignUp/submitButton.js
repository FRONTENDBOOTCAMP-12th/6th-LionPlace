import { LitElement, html } from 'lit';
import { submitButtonCss } from './submitButtonCss';
import commonStyles from '@/styles/common.js';

class SubmitButton extends LitElement {
  static properties = {
    disabled: { type: Boolean },
    text: { type: String },
  };

  static styles = [commonStyles, submitButtonCss];

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
