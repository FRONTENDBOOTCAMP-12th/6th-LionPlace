import '@/components/Button/Button';
import { LitElement, html, css } from 'lit';
import '@/components/Feed/nav-bar.js';
import '@/pages/feed-page/feed-page.js';

class App extends LitElement {
  static properties = {
    currentPage: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
      max-width: 480px;
      margin: 0 auto;
      position: relative;
    }

    main {
      flex: 1;
      overflow: auto;
      margin-bottom: 60px;
    }
  `;

  constructor() {
    super();
    this.currentPage = 'map';
  }

  render() {
    return html`
      <main>${this.renderPage()}</main>
      <nav-bar
        .activePage="${this.currentPage}"
        @nav-change="${(e) => {
          this.currentPage = e.detail;
        }}"
      ></nav-bar>
    `;
  }

  renderPage() {
    switch (this.currentPage) {
      case 'map':
        return html`<map-page></map-page>`;
      case 'saved':
        return html`<saved-page></saved-page>`;
      case 'feed':
        return html`<feed-page></feed-page>`;
      case 'my':
        return html`<my-page></my-page>`;
      default:
        return html`<saved-page></saved-page>`;
    }
  }
}

customElements.define('app-root', App);
