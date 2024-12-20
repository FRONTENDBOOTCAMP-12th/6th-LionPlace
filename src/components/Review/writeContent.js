import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss';

// TODO 사진 첨부 및 표시
// TODO 리뷰 작성 시 높이 변경
class ReviewWriteContent extends LitElement {
  static styles = [
    ...reviewStyles,
    css`
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2.125rem 0.875rem 1rem;

        .content__title {
          font-size: 1rem;
        }

        .content__photo {
          border: 1px solid var(--contentPrimary);
          font-size: 0.75rem;
          width: fit-content;
          gap: 0.25rem;

          .gray {
            color: var(--contentTertiary);
          }
        }

        .content__text {
          background-color: var(--gray--50);
          position: relative;
          width: 100%;

          textarea {
            font-family: inherit;
            background-color: transparent;
            box-sizing: border-box;
            width: 100%;
            padding: 1.5rem 0.75rem;
            color: var(--contentSecondary);
          }

          textarea::placeholder {
            color: var(--contentTertiary);
          }

          .content__text__count {
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 0.75rem;
            font-weight: 400; /* paragraph-regular */
            color: var(--contentTertiary);

            .count__now {
              color: var(--contentPrimary);
            }
          }
        }
      }
    `,
  ];

  static properties = {
    maxCount: { type: Number },
    content: { type: String },
  };

  constructor() {
    super();
    this._count = 0;
    this.content = '';
  }

  // TODO 사진추가 버튼 클릭
  _handlePictureAddClick(e) {
    alert('작업 예정');
  }

  // 리뷰 내용 입력 이벤트
  _handleInput(e) {
    const input = e.target.value;

    // maxCount를 초과하지 않도록 내용 제한
    if (input.length <= this.maxCount) {
      this.content = input;
      this._count = this.content.length;
      console.log(this.content, this._count);
    } else {
      // maxCount를 초과하는 경우 value를 수정하여 초과된 부분을 없애기
      e.target.value = this.content;
    }
  }

  render() {
    return html`
      <div class="content section">
        <h2 class="content__title">리뷰를 남겨주세요</h2>
        <button
          type="button"
          class="content__photo btn base rounded"
          @click="${this._handlePictureAddClick}"
        >
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 10.75H12.5L9.6875 7L7.4375 10L5.75 7.75L3.5 10.75ZM2 13.75C1.5875 13.75 1.2345 13.6033 0.941 13.3097C0.647 13.0157 0.5 12.6625 0.5 12.25V3.25C0.5 2.8375 0.647 2.4845 0.941 2.191C1.2345 1.897 1.5875 1.75 2 1.75H4.3625L5.75 0.25H10.25L11.6375 1.75H14C14.4125 1.75 14.7657 1.897 15.0597 2.191C15.3533 2.4845 15.5 2.8375 15.5 3.25V12.25C15.5 12.6625 15.3533 13.0157 15.0597 13.3097C14.7657 13.6033 14.4125 13.75 14 13.75H2ZM14 12.25V3.25H10.9625L9.59375 1.75H6.40625L5.0375 3.25H2V12.25H14Z"
            />
          </svg>
          <p class="">사진추가 <span class="gray">최대 20장</span></p>
        </button>

        <div class="content__text">
          <textarea
            id="content"
            name="content"
            placeholder="리뷰 작성하기"
            .value=${this.content}
            @input=${this._handleInput}
          >
></textarea
          >

          <div class="content__text__count">
            <span class="count__now" id="currentCount">${this._count}</span> /
            <span class="count__max" id="maxCount">${this.maxCount}</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('review-write-content-element', ReviewWriteContent);
