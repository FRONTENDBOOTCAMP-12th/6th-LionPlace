import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss';

class ReviewWriteKeywordItem extends LitElement {
  static styles = [
    ...reviewStyles,
    css`
      .keyword__item {
        margin: 0.5rem 0;
        font-size: 0.75rem;
        color: var(--contentSecondary);

        img {
          vertical-align: middle;
        }

        .keyword__item__checkbox {
          position: absolute;
          width: 0;
          height: 0;
          appearance: none;
        }

        .keyword__item__checkbox:checked + label {
          background-color: var(--contentPrimary);
          color: var(--white);
        }

        .keyword__item__label {
          white-space: nowrap;
          background-color: var(--white);
          box-shadow: 0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.05);
          gap: 0.75rem;
          height: 1.1875rem;

          span {
            vertical-align: middle;
          }
        }
      }
    `,
  ];

  static properties = {
    englishName: { type: String },
    text: { type: String },
  };

  firstUpdated() {
    console.log('englishName:', this.englishName);
    console.log('text:', this.text);
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="keyword__item">
        <input
          type="checkbox"
          class="keyword__item__checkbox"
          id="keyword-check-${this.englishName}"
        />
        <label
          for="keyword-check-${this.englishName}"
          class="keyword__item__label btn base rounded"
        >
          <img
            class=""
            src="/images/keywords/ico_${this.englishName}.png"
            alt="커피 아이콘 이미지"
            width="18"
            height="18"
          />
          <span class="keyword__text">${this.text}</span>
        </label>
      </div>
    `;
  }
}

customElements.define('review-write-keyword-item-element', ReviewWriteKeywordItem);
