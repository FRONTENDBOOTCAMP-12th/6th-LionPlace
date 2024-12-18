import '@/components/Button/Button';
import { LitElement, html, css } from 'lit';
import '@/components/SavedPlaces/navBar.js';
import '@/pages/saved/saved.js';
import '@/styles/main.css';

class App extends LitElement {
  static properties = {
    currentPage: { type: String },
  };

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
