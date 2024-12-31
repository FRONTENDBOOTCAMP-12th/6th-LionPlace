import { LitElement, html, css } from 'lit';
import { navBarStyles } from '../Feed/navBarCss';

import commonStyles from '@/styles/common.js';

class NavBar extends LitElement {
  static properties = {
    activePage: { type: String },
  };

  constructor() {
    super();
    this.activePage = 'saved'; // 기본값 설정
  }

  render() {
    return html`
      <nav class="tab-menu">
        <ul class="tab-list">
          <li class="tab-list-item">
            <a
              href="#"
              class="tab-item ${this.activePage === 'map' ? 'active' : ''}"
              @click="${(e) => this.handleClick(e, 'map')}"
            >
              <img src="/images/ico_map.svg" alt="지도" class="tab-icon" />
              <span class="tab-label">지도</span>
            </a>
          </li>
          <li class="tab-list-item">
            <a
              href="/src/pages/saved-places/index.html"
              class="tab-item ${this.activePage === 'saved' ? 'active' : ''}"
              @click="${(e) => this.handleClick(e, 'saved')}"
            >
              <img src="/images/ico_save.svg" alt="저장" class="tab-icon" />
              <span class="tab-label">저장</span>
            </a>
          </li>
          <li class="tab-list-item">
            <a
              href="/src/pages/feed/index.html"
              class="tab-item ${this.activePage === 'feed' ? 'active' : ''}"
              @click="${(e) => this.handleClick(e, 'feed')}"
            >
              <img src="/images/ico_feed.svg" alt="피드" class="tab-icon" />
              <span class="tab-label">피드</span>
            </a>
          </li>
          <li class="tab-list-item">
            <a
              href="#"
              class="tab-item ${this.activePage === 'my' ? 'active' : ''}"
              @click="${(e) => this.handleClick(e, 'my')}"
            >
              <img src="/images/ico_my.svg" alt="MY" class="tab-icon" />
              <span class="tab-label">MY</span>
            </a>
          </li>
        </ul>
      </nav>
    `;
  }

  handleClick(e, tab) {
    e.preventDefault();
    this.activePage = tab;
    this.dispatchEvent(
      new CustomEvent('nav-change', {
        detail: tab,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('nav-bar', NavBar);
