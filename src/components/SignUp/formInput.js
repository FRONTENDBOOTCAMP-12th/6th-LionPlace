import { LitElement, html, css } from 'lit';
import resetStyles from '@/styles/reset.js';

class FormInput extends LitElement {
  static properties = {
    label: { type: String },
    type: { type: String },
    id: { type: String },
    placeholder: { type: String },
    value: { type: String },
    error: { type: String },
  };

  static styles = [
    resetStyles,
    css`
      .form-group {
        width: 30rem;
        margin-bottom: 1rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: white;
      }

      .form-group input {
        box-sizing: border-box;
        width: 100%;
        padding: 1rem;
        border: 1px solid white;
        border-radius: 6px;
        background-color: transparent;
        color: white;
        font-size: 1rem;
      }

      .form-group input::placeholder {
        color: white;
      }

      .form-group .error {
        display: block;
        color: red;
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
    `,
  ];

  render() {
    return html`
      <div class="form-group">
        <label for="${this.id}">${this.label}</label>
        <input
          type="${this.type}"
          id="${this.id}"
          placeholder="${this.placeholder}"
          .value="${this.value}"
          @input="${this._handleInput}"
          aria-required="true"
          aria-describedby="${this.id}Error"
        />
        ${this.error ? html`<span id="${this.id}Error" class="error">${this.error}</span>` : ''}
      </div>
    `;
  }

  _handleInput(e) {
    this.dispatchEvent(
      new CustomEvent('input-change', {
        detail: { id: this.id, value: e.target.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('form-input', FormInput);
