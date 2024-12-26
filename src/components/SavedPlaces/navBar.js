import { LitElement, html, css } from 'lit';
import resetStyles from '@/styles/common.js';

class NavBar extends LitElement {
  static properties = {
    activePage: { type: String },
  };

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

    .tab-list {
      display: flex;
      justify-content: space-around;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .tab-list-item {
      flex: 1;
    }

    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem 0;
      text-decoration: none;
      color: #666;
      width: 100%;
      position: relative;
    }

    .tab-item.active::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0.625rem;
      right: 0.625rem;
      height: 0.1875rem;
      background-color: #171f31;
    }

    .tab-icon {
      width: 1.5rem;
      height: 1.5rem;
      margin-bottom: 0.25rem;
    }

    .tab-label {
      font-size: 0.75rem;
      font-family: 'Pretendard Variable', Pretendard, sans-serif;
    }
  `;

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
