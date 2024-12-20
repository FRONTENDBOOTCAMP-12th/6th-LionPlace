import { html, LitElement } from 'lit';
import { navgationStyles } from './navigationCss.js';
import resetStyle from '@/styles/reset.js';

class Navigation extends LitElement {
  static properties = {
    activePage: { type: String },
    loading: { type: Boolean },
  };

  constructor() {
    super();
    this.loading = false;
    const path = window.location.pathname;

    if (path.includes('/feed/')) this.activePage = 'feed';
    else if (path.includes('/visit/')) this.activePage = 'visit';
    else if (path.includes('/review/')) this.activePage = 'review';
    else if (path.includes('/reserved/')) this.activePage = 'reserved';
    else this.activePage = 'feed'; // 기본값
  }

  static styles = [navgationStyles, resetStyle];

  connectedCallback() {
    super.connectedCallback();
    // 빌드 시 페이지 이동 후에도 로딩 gif 유지가 지속되어 로딩 상태 초기화
    this.loading = false;
  }

  // 페이지 이동 함수
  _navigationTo(page) {
    const pageInfo = {
      feed: '/src/pages/feed/',
      visit: '/src/pages/visit/',
      review: '/src/pages/review/',
      reserved: '/src/pages/reserved/',
    };

    this.loading = true;
    this.requestUpdate();

    setTimeout(() => {
      window.location.href = pageInfo[page];
      // 1초 뒤 로딩 상태 초기화
      this.loading = false;
    }, 1000);
  }

  // 클릭 이벤트 함수
  handleClickBtn(e) {
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
              @click="${this.handleClickBtn}"
              class="${this.activePage === 'feed' ? 'is--active' : ''}"
              type="button"
              data-page="feed"
            >
              피드
            </button>
          </li>
          <li>
            <button
              @click="${this.handleClickBtn}"
              class="${this.activePage === 'visit' ? 'is--active' : ''}"
              type="button"
              data-page="visit"
            >
              방문
            </button>
          </li>
          <li>
            <button
              @click="${this.handleClickBtn}"
              class="${this.activePage === 'review' ? 'is--active' : ''}"
              type="button"
              data-page="review"
            >
              리뷰
            </button>
          </li>
          <li>
            <button
              @click="${this.handleClickBtn}"
              class="${this.activePage === 'reserved' ? 'is--active' : ''}"
              type="button"
              data-page="reserved"
            >
              예약•주문
            </button>
          </li>
        </ul>
      </div>
      ${this.loading ? this._renderLoading() : ''}
    `;
  }
}

customElements.define('navigation-element', Navigation);
