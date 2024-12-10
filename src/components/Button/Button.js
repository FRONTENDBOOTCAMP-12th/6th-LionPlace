import { LitElement, html, css } from 'lit';

class Button extends LitElement {
  static get styles() {
    return [
      css`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          outline: none;
          border: none;
          cursor: pointer;

          &.base {
            inline-size: 17.875rem;
            padding: 0.75rem 6.25rem;
          }
          &.black {
            background-color: var(--contentPrimary);
            color: var(--white);
          }
          &.ico1::before {
            content: '';
            inline-size: 1.1875rem;
            block-size: 1.125rem;
            background: url(/src/assets/ico_wirte.png);
          }
          &.rounded {
            border-radius: 0.5rem;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <button type="button" class="btn base black ico1 rounded">button</button>
    `;
  }
}

customElements.define('c-button', Button);
