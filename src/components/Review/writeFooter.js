import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss.js';

class ReviewWriteFooter extends LitElement {
  static styles = [
    ...reviewStyles,
    css`
      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.75rem;
        margin-bottom: 1.375rem;
        padding: 0 0.875rem;

        .guideline-btn {
          font-weight: 400; /* paragraph-regular */
          text-decoration: underline;
        }
        .submit-btn {
          font-size: 0.75rem;
          padding: 0.75rem 1.75rem;
        }
      }
    `,
  ];

  static properties = {};

  constructor() {
    super();
  }

  // TODO 유의사항 버튼 클릭 시 모달창 띄우기
  _handleGuideClick(e) {
    alert('작업 예정');
  }

  // 등록 버튼 클릭 이벤트를 상위 컴포넌트로 전달
  _handleSubmitClick(e) {
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent('submit-click', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <div class="footer section">
        <button type="button"
          id="guideline-btn"
          class="guideline-btn"
          @click="${this._handleGuideClick}"
          >리뷰 작성 유의사항</
        >
        <button type="submit" class="submit-btn btn base black rounded" @click="${this._handleSubmitClick}">
          등록하기
        </button>
      </div>
    `;
  }
}

customElements.define('review-write-footer-element', ReviewWriteFooter);
