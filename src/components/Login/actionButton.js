import { LitElement, html } from 'lit';
import { actionButtonStyles } from './actionButtonCss';
import commonStyles from '@/styles/common.js';

class ActionButton extends LitElement {
  static properties = {
    text: { type: String },
    onClick: { type: Function },
  };

  static styles = [commonStyles, actionButtonStyles];

  render() {
    return html` <button @click="${this.onClick}">${this.text}</button> `;
  }
}

customElements.define('action-button', ActionButton);
