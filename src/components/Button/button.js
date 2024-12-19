import { LitElement, html } from 'lit';
import { buttonStyles } from './buttonCss';
import resetStyles from '@/styles/reset.js';

class Button extends LitElement {
  static styles = [resetStyles, buttonStyles];

  render() {
    return html` <button type="button" class="btn base black ico1 rounded">button</button> `;
  }
}

customElements.define('c-button', Button);
