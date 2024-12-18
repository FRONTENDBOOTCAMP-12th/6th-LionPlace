import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss';

// TODO 리뷰 작성 유의사항 클릭 시 어디로? 뭘 띄울건가?
// TODO 등록 버튼 눌렀을 때 동작
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

  render() {
    return html`
      <div class="footer section">
        <a
          id="guideline-btn"
          class="guideline-btn"
          href="/"
          target="_blank"
          rel="noopenner noreferrer"
          >리뷰 작성 유의사항</a
        >
        <button type="button" class="submit-btn btn base black rounded">등록하기</button>
      </div>
    `;
  }
}

customElements.define('review-write-footer-element', ReviewWriteFooter);
