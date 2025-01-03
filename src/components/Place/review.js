import { LitElement, html, css } from 'lit';
import { getPbImageURL } from '@/api/getPbImageURL.js';
import commonStyles from '@/styles/common.js';
import { reviewStyles } from './reviewCss.js';

class Review extends LitElement {
  static styles = [commonStyles, reviewStyles];

  static properties = {
    reviews: { type: Array },
    reviewKeywords: { type: Array },
    totalReviewCount: { type: Number },
    totalKeywordCount: { type: Number },
    is_preview: { type: Boolean },
  };

  constructor() {
    super();
  }

  // Date 타입 객체 형식 변경
  _formatDate(dateString) {
    const date = new Date(dateString);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열
    const day = date.getDate(); // 날짜 (일)
    const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
    const year = date.getFullYear(); // 연도
    const dayOfWeek = daysOfWeek[date.getDay()]; // 요일 (0부터 6까지의 값을 요일명으로 변환)

    // 원하는 형식으로 날짜를 반환
    return `${year.toString().slice(-2)}.${month}.${day}.${dayOfWeek}`;
  }

  // 더보기 버튼 클릭 시
  _handleMoreClick() {
    this.dispatchEvent(
      new CustomEvent('preview-more-click', {
        detail: { type: 'review' },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <section class="review-section">
        <h2>
          <span>방문자 리뷰</span>
          <span class="review-count">
            <span class="a11y-hidden">총 리뷰 개수</span>
            ${this.totalReviewCount}
          </span>
        </h2>

        <div class="keyword-preview">
          <button class="keyword-btn" @click=${this._handleMoreClick}>
            <ul class="keyword-list">
              ${this.reviewKeywords.map(
                (item) => html`
                  <li>
                    <div
                      class="bar"
                      style="width: ${(item.count / this.totalKeywordCount) * 100}%;
                      opacity: ${item.count / this.reviewKeywords[0].count};"
                    ></div>
                    <div class="info">
                      <figure>
                        <img
                          role="presentation"
                          src="/images/keywords/ico_${item.keyword_icon}.png"
                          alt=""
                          width="18"
                          height="18"
                        />
                        <figcaption>
                          <span aria-hidden="true">&quot;</span>
                          ${item.keyword_name}
                          <span aria-hidden="true">&quot;</span>
                        </figcaption>
                      </figure>

                      <span class="count">
                        <span class="a11y-hidden">이 키워드를 선택한 인원</span>
                        ${item.count}
                      </span>
                    </div>
                  </li>
                `
              )}
            </ul>
          </button>
        </div>

        <ul class="review-list">
          ${this.reviews.map(
            (item) => html`
              <li>
                <div class="review-content">
                  <p class="content-text">${item.content}</p>
                  ${item.image && item.image.length > 0
                    ? html`<figure class="content-image">
                        <img src="${getPbImageURL(item)}" alt="" />
                        <figcaption class="a11y-hidden">리뷰 사진</figcaption>
                      </figure>`
                    : ''}
                </div>

                <div class="post-header">
                  <div class="user-info">
                    <img
                      class="profile-image"
                      src="${item.user_avatar_src}"
                      alt="프로필"
                      onerror="this.src='/images/profile.png';"
                    />
                    <div class="user-details">
                      <span class="username">${item.user_name}</span>
                      <span class="date">${this._formatDate(item.visit_date)}</span>
                    </div>
                  </div>
                </div>
              </li>
            `
          )}
        </ul>
        ${this.is_preview
          ? html`<button @click="${this._handleMoreClick}" class="more-button">
              방문자 리뷰 더보기
            </button>`
          : ''}
      </section>
    `;
  }
}

customElements.define('review-element', Review);
