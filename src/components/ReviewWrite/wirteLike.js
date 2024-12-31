import { LitElement, html, css } from 'lit';
import { reviewWriteStyles } from './reviewWriteCss.js';

class ReviewWriteLike extends LitElement {
  static styles = [
    ...reviewWriteStyles,
    css`
      .like {
        padding: 1.625rem 4.625rem 2.5rem 4.625rem;
        text-align: center;

        strong.description__text {
          font-size: 1rem;
          color: var(--contentPrimary);
        }

        div.description__text {
          margin: 0.5rem 0;

          p {
            font-size: 0.75rem;
            font-weight: 400; /* paragraph-regular */
            color: var(--contentTertiary);
          }
        }

        .like__label {
          border: 1px solid var(--contentTertiary);
          font-size: 0.75rem;
        }
        .like__checkbox:checked + label {
          border: 1px solid var(--contentPrimary);
          background-color: var(--contentPrimary);
          color: var(--white);
        }
      }
    `,
  ];

  static properties = {};

  constructor() {
    super();
  }

  _likeChanged(e) {
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent('like-change', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <section class="like">
        <h2 class="a11y-hidden">이 장소 좋아요</h2>
        <div class="like__description">
          <strong class="description__text">이 곳이 마음에 든다면, </strong>
          <div class="description__text">
            <p>‘좋아요' 누르고</p>
            <p>취향이 비슷한 사람을 추천받으세요.</p>
          </div>
        </div>

        <input
          type="checkbox"
          class="like__checkbox a11y-hidden"
          id="like-check"
          @change=${this._likeChanged}
        />
        <label for="like-check" class="like__label btn base rounded">
          <svg
            role="img"
            aria-labelledby="like-text"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="like-text">좋아요</title>
            <path
              d="M9 16.0125L7.9125 15.0225C4.05 11.52 1.5 9.2025 1.5 6.375C1.5 4.0575 3.315 2.25 5.625 2.25C6.93 2.25 8.1825 2.8575 9 3.81C9.8175 2.8575 11.07 2.25 12.375 2.25C14.685 2.25 16.5 4.0575 16.5 6.375C16.5 9.2025 13.95 11.52 10.0875 15.0225L9 16.0125Z"
              fill="#F03F40"
            />
          </svg>
          <span>이런 곳 좋아요!</span>
        </label>
      </section>
    `;
  }
}

customElements.define('review-write-like-element', ReviewWriteLike);
