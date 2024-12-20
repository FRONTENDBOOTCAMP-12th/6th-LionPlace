import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss';

// TODO 좋아요 버튼 활성화/비활성화
class ReviewWriteLike extends LitElement {
  static styles = [
    ...reviewStyles,
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
      <div class="like section">
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
            width="14"
            height="14"
            fill="#e11900"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="like-text">좋아요</title>
            <path
              d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"
            ></path>
          </svg>
          <span>이런 곳 좋아요!</span>
        </label>
      </div>
    `;
  }
}

customElements.define('review-write-like-element', ReviewWriteLike);
