import { html, LitElement } from 'lit';
import { navgationStyles } from './navigationCss';
import resetStyle from '@/styles/reset';

class Navigation extends LitElement {
  static properties = {
    activePage: { type: String },
  };

  constructor() {
    super();
    this.activePage = 'feed'; // 초기 acitve 페이지 설정
  }

  static styles = [navgationStyles, resetStyle];

  // 페이지 이동 함수
  navigationTo(page) {
    const pageInfo = {
      feed: '/src/pages/feed',
      visit: '/src/pages/visit',
      review: '/src/pages/review',
      reservation: '/src/pages/reservation',
    };

    window.location.href = pageInfo[page]; // 객체 값에 접근
  }

  // 클릭 이벤트 함수
  handleClickBtn(e) {
    const pageData = e.target.dataset.page;
    this.activePage = pageData;
    this.navigationTo(pageData);
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
              class="${this.activePage === 'reservation' ? 'is--active' : ''}"
              type="button"
              data-page="reservation"
            >
              예약•주문
            </button>
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define('navigation-element', Navigation);
