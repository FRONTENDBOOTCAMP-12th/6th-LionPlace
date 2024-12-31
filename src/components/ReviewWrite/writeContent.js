import { LitElement, html, css } from 'lit';
import { reviewWriteStyles } from './reviewWriteCss.js';

class ReviewWriteContent extends LitElement {
  static styles = [
    ...reviewWriteStyles,
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

        .content__image-label {
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
            min-height: 6.8125rem;
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
    images: { type: Array },
    content: { type: String },
    maxLength: { type: Number },
    maxImageCount: { type: String },
  };

  constructor() {
    super();
    this.images = [];
    this.content = '';
    this.maxLength = 400;
    this._contentLength = 0;
  }

  // TODO 사진추가 버튼 클릭
  _handlePictureAddClick(e) {
    alert('작업 예정');
  }

  // 사진 추가
  _handleFileChange(event) {
    const files = event.target.files;
    const fileArray = Array.from(files); // FileList 객체를 배열로 변환

    // 이미지 파일만 필터링하여 URL로 변환
    const imageUrls = fileArray
      .filter((file) => file.type.startsWith('image/')) // 이미지 파일만 필터링
      .map((item) => URL.createObjectURL(item));

    // 이미지 형식이 아닌 파일이 있는 경우 alert
    if (fileArray.length != imageUrls.length) {
      alert('이미지 형식의 파일만 첨부할 수 있습니다.');
    }

    // 20개 이상의 파일을 선택했을 경우 추가하지 않도록 제한
    if (this.images.length + fileArray.length > 20) {
      alert('이미지는 최대 20개까지 업로드할 수 있습니다.');
      return;
    }

    // 이미지 URL 배열에 추가
    this.images = [...this.images, ...imageUrls]; // 기존 이미지를 새로운 이미지 URL과 합침
  }

  // 사진 삭제
  _handleImageDelete(imageUrl) {
    this.images = this.images.filter((url) => url !== imageUrl); // 해당 URL을 제외한 나머지 이미지들만 남기기
  }

  // 리뷰 내용 입력 이벤트
  // TODO 리뷰 작성 시 높이 변경
  _handleInput(e) {
    const input = e.target.value;

    // maxLength를 초과하지 않도록 내용 제한
    if (input.length <= this.maxLength) {
      this.content = input;
      this._contentLength = this.content.length;
      console.log(this.content, this._contentLength);
    } else {
      // maxLength를 초과하는 경우 value를 수정하여 초과된 부분을 없애기
      e.target.value = this.content;
    }
  }

  render() {
    return html`
      <section class="content">
        <h2 class="content__title">리뷰를 남겨주세요</h2>
        <div>
          <input
            type="file"
            class="a11y-hidden content__image-input"
            id="images"
            name="images"
            accept="image/*"
            multiple
            @change="${this._handleFileChange}"
          />
          <label for="images" class="content__image-label btn base rounded">
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
          </label>
        </div>
        <div class="image-container">
          ${this.images.map(
            (item) => html`
              <div class="image-wrapper">
                <img src="${item}" alt="Selected image" />
                <button class="delete-image-btn" @click="${() => this._handleImageDelete(item)}">
                  <svg
                    role="img"
                    aria-labelledby="delete-image-text"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title id="delete-image-text">첨부한 사진 삭제</title>
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
            `
          )}
        </div>

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
            <span class="count__now" id="currentCount">${this._contentLength}</span> /
            <span class="count__max" id="maxLength">${this.maxLength}</span>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('review-write-content-element', ReviewWriteContent);
