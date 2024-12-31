import { html, LitElement } from 'lit';
import { navgationStyles } from './navigationCss.js';
import commonStyles from '@/styles/common.js';

class Navigation extends LitElement {
  static properties = {
    activePage: { type: String },
    loading: { type: Boolean },
  };

  static styles = [navgationStyles, commonStyles];

  constructor() {
    super();
    this.loading = false;
    this.activePage = 'home'; // 기본값
  }

  connectedCallback() {
    super.connectedCallback();
    // 빌드 시 페이지 이동 후에도 로딩 gif 유지가 지속되어 로딩 상태 초기화
    this.loading = false;
  }

  // 페이지 이동 함수
  _navigationTo(page) {
    // TODO

    // this.loading = true;
    this.requestUpdate();
  }

  // 클릭 이벤트 함수
  _handleClickBtn(e) {
    const pageData = e.target.dataset.page;
    if (pageData === this.activePage) return;
    this.activePage = pageData;
    this._navigationTo(pageData);
  }

  _renderLoading() {
    return html`
      <div class="loading">
        <img src="/images/loading_spinner.gif" alt="로딩중" />
      </div>
    `;
  }

  render() {
    return html`
      <div class="navigation-warp">
        <ul>
          <li>
            <button
              @click="${this._handleClickBtn}"
              class="${this.activePage === 'home' ? 'is--active' : ''}"
              type="button"
              data-page="home"
            >
              홈
            </button>
          </li>
          <li>
            <button
              @click="${this._handleClickBtn}"
              class="${this.activePage === 'menu' ? 'is--active' : ''}"
              type="button"
              data-page="menu"
            >
              메뉴
            </button>
          </li>
          <li>
            <button
              @click="${this._handleClickBtn}"
              class="${this.activePage === 'review' ? 'is--active' : ''}"
              type="button"
              data-page="review"
            >
              리뷰
            </button>
          </li>
          <li>
            <button
              @click="${this._handleClickBtn}"
              class="${this.activePage === 'image' ? 'is--active' : ''}"
              type="button"
              data-page="image"
            >
              사진
            </button>
          </li>
          <li>
            <button
              @click="${this._handleClickBtn}"
              class="${this.activePage === 'map' ? 'is--active' : ''}"
              type="button"
              data-page="map"
            >
              지도
            </button>
          </li>
        </ul>
      </div>
      ${this.loading ? this._renderLoading() : ''}
    `;
  }
}

customElements.define('navigation-element', Navigation);
