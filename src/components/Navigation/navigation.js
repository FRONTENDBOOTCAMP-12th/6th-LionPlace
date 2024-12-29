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
    this.loading = false; // 기본 로딩 상태 false로 초기화
    const path = window.location.pathname; // 현재 브라우저의 URL 경로 가져오는 메서드

    /**
     * 네비게이션 탭 클릭 시 URL 경로 중 해당 조건에 맞는
     * 텍스트 포함 여부 확인하여 해당 페이지 활성화된 상태로 반영
     */
    if (path.includes('/feed/')) this.activePage = 'feed';
    else if (path.includes('/visit/')) this.activePage = 'visit';
    else if (path.includes('/review/')) this.activePage = 'review';
    else if (path.includes('/reserved/')) this.activePage = 'reserved';
    else this.activePage = 'feed'; // 기본값
  }

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

    this.loading = true; // 페이지 이동 시 로딩 상태 true로 변경
    this.requestUpdate(); // 상태 변경 반영 메서드

    setTimeout(() => {
      window.location.href = pageInfo[page];
      // 1초 뒤 로딩 상태 초기화
      this.loading = false;
    }, 1000);
  }

  // 클릭 이벤트 함수
  _handleClickBtn(e) {
    /**
     * data-page가 활성화된 상태의 페이지면 아무 일도 일어나지 않고(종료),
     * 그렇지 않으면 새로운 페이지로 활성화 상태 변경 및 이동
     */
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
      <nav class="navigation-warp">
        <ul>
          <li>
            <button
              @click="${this._handleClickBtn}"
              class="${this.activePage === 'feed' ? 'is--active' : ''}"
              type="button"
              data-page="feed"
            >
              피드
            </button>
          </li>
          <li>
            <button
              @click="${this._handleClickBtn}"
              class="${this.activePage === 'visit' ? 'is--active' : ''}"
              type="button"
              data-page="visit"
            >
              방문
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
              class="${this.activePage === 'reserved' ? 'is--active' : ''}"
              type="button"
              data-page="reserved"
            >
              예약•주문
            </button>
          </li>
        </ul>
      </nav>
      ${this.loading ? this._renderLoading() : ''}
    `;
  }
}

customElements.define('navigation-element', Navigation);
