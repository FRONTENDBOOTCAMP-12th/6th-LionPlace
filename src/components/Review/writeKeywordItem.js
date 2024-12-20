import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss.js';

class ReviewWriteKeywordItem extends LitElement {
  static styles = [
    ...reviewStyles,
    css`
      .keyword-item {
        margin: 0.5rem 0;
        font-size: 0.75rem;
        color: var(--contentSecondary);

        img {
          vertical-align: middle;
        }

        .keyword-item__checkbox {
          position: absolute;
          width: 0;
          height: 0;
          appearance: none;
        }

        .keyword-item__checkbox:checked + label {
          background-color: var(--contentPrimary);
          color: var(--white);
        }

        .keyword-item__label {
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
    keyword: { type: Object },
    selectedKeywords: { type: Array },
    isChecked: { type: Boolean },
  };

  constructor() {
    super();
  }

  // 키워드 상태가 변경되기 전에 체크 제한을 걸도록
  _handleClick(e) {
    const isChecked = e.target.checked;

    if (isChecked && this.selectedKeywords.length >= 5) {
      alert('최대 5개의 키워드만 선택할 수 있습니다.');
      e.preventDefault();
    }
  }

  // 키워드 변경 이벤트를 상위 컴포넌트로 전달
  _handleChange(e) {
    const isChecked = e.target.checked;

    this.dispatchEvent(
      new CustomEvent('keyword-change', {
        detail: { keyword: this.keyword, isChecked },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <li>
        <div class="keyword-item">
          <input
            type="checkbox"
            class="keyword-item__checkbox"
            id="keyword-check-${this.keyword.id}"
            .checked="${this.isChecked}"
            @change="${this._handleChange}"
            @click="${this._handleClick}"
          />
          <label
            for="keyword-check-${this.keyword.id}"
            class="keyword-item__label btn base rounded"
          >
            <img
              role="presentation"
              src="/images/keywords/ico_${this.keyword.imageEnglishName}.png"
              alt=""
              class=""
              width="18"
              height="18"
            />
            <span class="keyword__text">${this.keyword.text}</span>
          </label>
        </div>
      </li>
    `;
  }
}

customElements.define('review-write-keyword-item-element', ReviewWriteKeywordItem);
