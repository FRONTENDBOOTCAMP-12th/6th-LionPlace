import { LitElement, html, css } from 'lit';

class Logo extends LitElement {
  static properties = {
    link: { type: String },
  };

  static styles = css`
    .logo {
      display: block;
      text-align: center;
      margin-bottom: 3rem;
    }

    .logo img {
      width: auto;
      height: 12rem;
    }
  `;

  render() {
    return html`
      <a href="${this.link}" class="logo">
        <img src="/images/img_logo.svg" alt="Lion Place 로고" />
      </a>
    `;
  }
}

customElements.define('app-logo', Logo);
