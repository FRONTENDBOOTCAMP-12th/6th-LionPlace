import { LitElement, html } from 'lit';
import { logoCss } from './logoCss';
class Logo extends LitElement {
  static properties = {
    link: { type: String },
  };

  static styles = logoCss;

  render() {
    return html`
      <a href="${this.link}" class="logo">
        <img src="/images/img_logo.svg" alt="Lion Place 로고" />
      </a>
    `;
  }
}

customElements.define('app-logo', Logo);
