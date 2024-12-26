import { LitElement, html, css } from 'lit';
import resetStyles from '@/styles/reset.js';

class NavBar extends LitElement {
  static properties = {
    activePage: { type: String }, // 활성 페이지를 추적하기 위한 속성 추가
  };

  constructor() {
    super();
    this.activePage = 'feed'; // 기본값 설정
  }

  static styles = css`
    .tab-menu {
      position: fixed;
      z-index: 100;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top: 0.0625rem solid #eee;
    }

    .tab-menu__list {
      display: flex;
      justify-content: space-around;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .tab-menu__list-item {
      flex: 1;
    }

    .tab-menu__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem 0;
      text-decoration: none;
      color: #666;
      width: 100%;
      position: relative;
    }

    .tab-menu__item--active::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0.625rem;
      right: 0.625rem;
      height: 0.1875rem;
      background-color: #171f31;
    }

    .tab-menu__icon {
      width: 1.5rem;
      height: 1.5rem;
      margin-bottom: 0.25rem;
    }

    .tab-menu__label {
      font-size: 0.75rem;
    }
  `;

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
              <img src="/images/ico_map.svg" alt="지도" class="tab-menu__icon" />
              <span class="tab-menu__label">지도</span>
            </a>
          </li>
          <li class="tab-menu__list-item">
            <a
              href="/src/components/SavedPlaces/index.html"
              class="tab-menu__item ${this.activePage === 'saved' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'saved')}"
            >
              <img src="/images/ico_save.svg" alt="저장" class="tab-menu__icon" />
              <span class="tab-menu__label">저장</span>
            </a>
          </li>
          <li class="tab-menu__list-item">
            <a
              href="/src/components/Feed/index.html"
              class="tab-menu__item ${this.activePage === 'feed' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'feed')}"
            >
              <img src="/images/ico_feed.svg" alt="피드" class="tab-menu__icon" />
              <span class="tab-menu__label">피드</span>
            </a>
          </li>
          <li class="tab-menu__list-item">
            <a
              href="#"
              class="tab-menu__item ${this.activePage === 'my' ? 'tab-menu__item--active' : ''}"
              @click="${(e) => this.handleClick(e, 'my')}"
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
