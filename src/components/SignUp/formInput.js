import { LitElement, html } from 'lit';
import { formInputCss } from './formInputCss';
import commonStyles from '@/styles/common.js';

class FormInput extends LitElement {
  static properties = {
    label: { type: String },
    type: { type: String },
    id: { type: String },
    placeholder: { type: String },
    value: { type: String },
    error: { type: String },
  };

  static styles = [commonStyles, formInputCss];

  _handleInput(e) {
    this.dispatchEvent(
      new CustomEvent('input-change', {
        detail: { id: this.id, value: e.target.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="form-group">
        <label for="${this.id}">${this.label}</label>
        <input
          type="${this.type}"
          id="${this.id}"
          placeholder="${this.placeholder || ''}"
          .value="${this.value}"
          @input="${this._handleInput}"
          aria-required="true"
          aria-invalid="${this.error ? 'true' : 'false'}"
          aria-errormessage="${this.error ? `${this.id}Error` : ''}"
        />
        ${this.error ? html`<span id="${this.id}Error" class="error">${this.error}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('form-input', FormInput);
