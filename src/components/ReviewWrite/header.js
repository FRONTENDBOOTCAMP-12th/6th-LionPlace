import { LitElement, html, css } from 'lit';
import { reviewWriteStyles } from './reviewWriteCss.js';

class ReviewHeader extends LitElement {
  static styles = [
    ...reviewWriteStyles,
    css`
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0.875rem;

        .title {
          font-size: 1rem;
        }

        .btn.close-btn {
          padding: 0 !important;
        }
      }
    `,
  ];

  static properties = {
    title: { type: String },
  };

  constructor() {
    super();
  }

  // 닫기 버튼 클릭
  _handleCloseClick(e) {
    this.dispatchEvent(
      new CustomEvent('close-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <section class="header">
        <h1 class="title">
          <!-- <slot name="title"></slot> -->
          ${this.title}
        </h1>
        <button type="button" class="close-btn btn" @click="${this._handleCloseClick}">
          <svg
            role="img"
            aria-labelledby="close-text"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="close-text">닫기</title>
            <path
              d="M13 13L7 7M7 7L1 1M7 7L13 1M7 7L1 13"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </section>
    `;
  }
}

customElements.define('review-header-element', ReviewHeader);
