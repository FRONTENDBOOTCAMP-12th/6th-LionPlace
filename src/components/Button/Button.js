import { LitElement, html } from 'lit';
import { buttonStyles } from './buttonCss';

class Button extends LitElement {
  static styles = buttonStyles;

  render() {
    return html`
      <button type="button" class="btn base black ico1 rounded">button</button>
    `;
  }
}

customElements.define('c-button', Button);
