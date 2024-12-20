import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss.js';
import './writeKeywordItem.js';

class ReviewWriteKeywordList extends LitElement {
  static styles = [
    ...reviewStyles,
    css`
      .keyword__list-more {
        text-align: center;

        .list-more-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
          background: var(--white);
        }
      }
    `,
  ];

  static properties = {
    keywords: { type: Array },
    selectedKeywords: { type: Array },
  };

  constructor() {
    super();
  }

  // TODO 더보기 버튼 클릭
  // TODO 색깔 변경 작업
  _handleMoreClick(e) {
    alert('작업 예정');
  }

  render() {
    return html`
      <ul class="keyword__list">
        ${this.keywords.map(
          (keyword) =>
            html` <review-write-keyword-item-element
              .keyword=${keyword}
              .selectedKeywords=${this.selectedKeywords}
              .isChecked=${this.selectedKeywords.some((k) => k.id == keyword.id)}
            ></review-write-keyword-item-element>`
        )}
      </ul>
      <div class="keyword__list-more">
        <button
          type="button"
          class="list-more-btn"
          aria-expanded="false"
          @click=${this._handleMoreClick}
        >
          <span class="a11y-hidden">더보기</span>
          <svg
            width="17"
            height="11"
            viewBox="0 0 17 11"
            fill="#A6A6A6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.49995 10.4627C8.29995 10.4627 8.10645 10.4252 7.91945 10.3502C7.73145 10.2752 7.57495 10.1752 7.44995 10.0502L0.549951 3.1502C0.274951 2.8752 0.137451 2.52519 0.137451 2.10019C0.137451 1.67519 0.274951 1.32519 0.549951 1.05019C0.824951 0.775195 1.17495 0.637695 1.59995 0.637695C2.02495 0.637695 2.37495 0.775195 2.64995 1.05019L8.49995 6.9002L14.35 1.05019C14.625 0.775195 14.975 0.637695 15.4 0.637695C15.825 0.637695 16.1749 0.775195 16.4499 1.05019C16.7249 1.32519 16.8625 1.67519 16.8625 2.10019C16.8625 2.52519 16.7249 2.8752 16.4499 3.1502L9.54995 10.0502C9.39995 10.2002 9.23745 10.3062 9.06245 10.3682C8.88745 10.4312 8.69995 10.4627 8.49995 10.4627Z"
            />
          </svg>
        </button>
      </div>
    `;
  }
}

customElements.define('review-write-keyword-list-element', ReviewWriteKeywordList);
