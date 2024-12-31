import { LitElement, html } from 'lit';
import { navBarStyles } from './navBarCss.js';

import commonStyles from '@/styles/common.js';

class NavBar extends LitElement {
  static properties = {
    activePage: { type: String }, // 활성 페이지를 추적하기 위한 속성 추가
  };

  constructor() {
    super();
    this.activePage = this.getActivePageFromURL(); // URL 기반으로 활성 페이지 설정
  }

  static styles = [navBarStyles];

  // 현재 URL에서 활성 탭을 추출하는 메서드
  getActivePageFromURL() {
    const path = window.location.pathname;
    if (path.includes('/map')) return 'map';
    if (path.includes('/saved-places')) return 'saved';
    if (path.includes('/feed')) return 'feed';
    if (path.includes('/reserved')) return 'my';
    return 'my'; // 기본값
  }

  handleClick(e, tab, url = null) {
    e.preventDefault();
    if (url) {
      window.location.href = url; // 지정된 URL로 이동
    }
  }

  render() {
    return html`
      <nav class="tab-menu">
        <ul class="tab-menu__list">
          <li class="tab-menu__list-item">
            <a
              href="/src/pages/map/index.html"
              class="tab-menu__item ${this.activePage === 'map' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'map', '/src/pages/map/index.html')}"
            >
              <img src="/images/ico_map.svg" alt="지도" class="tab-menu__icon" />
              <span class="tab-menu__label">지도</span>
            </a>
          </li>
          <li class="tab-menu__list-item">
            <a
              href="/src/pages/saved-places/index.html"
              class="tab-menu__item ${this.activePage === 'saved' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'saved', '/src/pages/saved-places/index.html')}"
            >
              <img src="/images/ico_save.svg" alt="저장" class="tab-menu__icon" />
              <span class="tab-menu__label">저장</span>
            </a>
          </li>
          <li class="tab-menu__list-item">
            <a
              href="/src/pages/feed/index.html"
              class="tab-menu__item ${this.activePage === 'feed' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'feed', '/src/pages/feed/index.html')}"
            >
              <img src="/images/ico_feed.svg" alt="피드" class="tab-menu__icon" />
              <span class="tab-menu__label">피드</span>
            </a>
          </li>
          <li class="tab-menu__list-item">
            <a
              href="/src/pages/reserved/index.html"
              class="tab-menu__item ${this.activePage === 'my' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'my', '/src/pages/reserved/index.html')}"
            >
              <img src="/images/ico_my.svg" alt="MY" class="tab-menu__icon" />
              <span class="tab-menu__label">MY</span>
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
