import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss';

class ReviewHeader extends LitElement {
  static styles = [
    ...reviewStyles,
    css`
      .header {
        position: relative;
        box-sizing: border-box;
        height: 2.5rem;
        line-height: 2.5rem;
        padding: 0 0.875rem;

        .title {
          font-size: 1rem;
        }

        .close-btn {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          padding-right: 0.875rem;
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

  render() {
    return html`
      <div class="header section">
        <h1 class="title">${this.title}</h1>
        <button type="button" class="close-btn">
          <span class="a11y-hidden">닫기</span>

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
      </div>
    `;
  }
}

customElements.define('review-header-element', ReviewHeader);
