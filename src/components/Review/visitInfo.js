import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss';

class ReviewVisitInfo extends LitElement {
  static styles = [
    ...reviewStyles,
    css`
      .visit-info {
        padding: 0.875rem;
        font-size: 0.75rem;
        line-height: 1.5;

        img {
        }

        .visit-info__place-name {
          color: var(--contentPrimary);
        }

        .visit-info__visit-date {
          font-weight: 400; /* paragraph-regular */
          color: var(--contentTertiary);
        }

        .visit-info__product-name {
          font-weight: 400; /* paragraph-regular */
          color: var(--contentSecondary);
        }
      }
    `,
  ];

  static properties = {};

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="visit-info section">
        <h2 class="a11y-hidden">방문 정보</h2>
        <img class="visit-info__img" src="/" alt="상품명" onerror="this.style.display='none'" />
        <strong class="visit-info__place-name">가게명</strong>
        <p class="visit-info__visit-date">2023.1.18 (수) 9번째 방문</p>
        <p class="visit-info__product-name">상품명</p>
      </div>
    `;
  }
}

customElements.define('review-visit-info-element', ReviewVisitInfo);
