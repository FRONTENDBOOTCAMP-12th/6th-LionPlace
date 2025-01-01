import { LitElement, html } from 'lit';
import { navBarStyles } from './navBarCss';

import commonStyles from '@/styles/common.js';

class NavBar extends LitElement {
  static properties = {
    activePage: { type: String }, // 활성 페이지를 추적하기 위한 속성 추가
  };

  constructor() {
    super();
    this.activePage = 'feed'; // 기본값 설정
  }

  static styles = [navBarStyles];

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

  render() {
    return html`
      <nav class="tab-menu">
        <ul class="tab-menu__list">
          <li class="tab-menu__list-item">
            <a
              href="#"
              class="tab-menu__item ${this.activePage === 'map' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'map')}"
            >
              <img src="/images/ico_map.svg" alt="" role="presentation" class="tab-menu__icon" />
              <span class="tab-menu__label">지도</span>
            </a>
          </li>
          <li class="tab-menu__list-item">
            <a
              href="/src/components/SavedPlaces/index.html"
              class="tab-menu__item ${this.activePage === 'saved' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'saved')}"
            >
              <img src="/images/ico_save.svg" alt="" role="presentation" class="tab-menu__icon" />
              <span class="tab-menu__label">저장</span>
            </a>
          </li>
          <li class="tab-menu__list-item">
            <a
              href="/src/components/Feed/index.html"
              class="tab-menu__item ${this.activePage === 'feed' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'feed')}"
            >
              <img src="/images/ico_feed.svg" alt="" role="presentation" class="tab-menu__icon" />
              <span class="tab-menu__label">피드</span>
            </a>
          </li>
          <li class="tab-menu__list-item">
            <a
              href="#"
              class="tab-menu__item ${this.activePage === 'my' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'my')}"
            >
              <img src="/images/ico_my.svg" alt="" role="presentation" class="tab-menu__icon" />
              <span class="tab-menu__label">MY</span>
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
