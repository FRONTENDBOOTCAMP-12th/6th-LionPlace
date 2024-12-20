import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss.js';
import './writeKeywordCategory.js';

// TODO 수정 - 드래그 기능(현재: 모바일 버전 안됨)
class ReviewWriteKeyword extends LitElement {
  static styles = [
    ...reviewStyles,
    css`
      .keyword {
        background-color: var(--gray--50);
        padding: 0;

        .keyword__question {
          padding: 1.5rem 3.8125rem;
          text-align: center;

          .keyword__question__text {
            font-size: 1rem;
            color: var(--contentPrimary);
          }

          .keyword__question__text-desc {
            margin-top: 0.625rem;
            font-size: 0.75rem;
            color: var(--contentTertiary);
          }
        }

        .keyword__view {
          position: relative;
          overflow: hidden;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-drag: none;
          padding-bottom: 1.5rem;
        }

        .keyword__category-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          position: relative;
          flex-direction: row;
          justify-content: space-between;

          .keyword__category {
            padding-left: 1.25rem;
            flex-grow: 1;
            display: inline-block;
            /* vertical-align: top; */

            .keyword__category-name {
              display: inline-block;
              font-size: 0.75rem;
            }

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

            .keyword__list-more {
              text-align: center;

              .list-more-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 2.25rem;
                height: 2.25rem;
                border-radius: 50%;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
                background: var(--white);
              }
            }
          }

          .keyword__category:last-child {
            padding-right: 1.25rem;
          }
        }
      }
    `,
  ];

  static properties = {
    keywordCategories: { type: Array },
    selectedKeywords: { type: Array },
  };

  constructor() {
    super();
    this._isMouseDown = false;
    this._startX = 0;
    this._scrollStart = 0;
    this._offset = 0;
    this._keywordCategoryWrapper = null;
  }

  firstUpdated() {
    this._keywordCategoryWrapper = this.shadowRoot.querySelector('.keyword__category-wrapper');

    if (this._keywordCategoryWrapper) {
      this._keywordCategoryWrapper.addEventListener('mousedown', this._mouseDownHandler.bind(this));
      this._keywordCategoryWrapper.addEventListener('mouseup', this._mouseUpHandler.bind(this));
      this._keywordCategoryWrapper.addEventListener(
        'mouseleave',
        this._mouseLeaveHandler.bind(this)
      );
      this._keywordCategoryWrapper.addEventListener('mousemove', this._mouseMoveHandler.bind(this));
    }
  }

  // 마우스 버튼을 누를 때 발생하는 이벤트 핸들러
  _mouseDownHandler(e) {
    this._isMouseDown = true;
    this._startX = e.pageX; // 마우스 시작 위치 기록
    this._scrollStart = this._offset; // 스크롤 시작 위치 기록
    this._keywordCategoryWrapper.classList.add('dragging'); // 드래그 중 클래스 추가
  }

  // 마우스를 놓을 때 발생하는 이벤트 핸들러
  _mouseUpHandler() {
    this._isMouseDown = false;
    this._keywordCategoryWrapper.classList.remove('dragging'); // 드래그 중 클래스 제거
    this._resetPosition(); // 드래그 종료 후 부드럽게 이동
  }

  // 마우스가 영역을 벗어날 때 발생하는 이벤트 핸들러
  _mouseLeaveHandler() {
    this._isMouseDown = false;
    this._keywordCategoryWrapper.classList.remove('dragging');
    this._resetPosition(); // 드래그 종료 후 부드럽게 이동
  }

  // 마우스를 움직일 때 발생하는 이벤트 핸들러
  _mouseMoveHandler(e) {
    if (!this._isMouseDown) return;

    const moveX = e.pageX - this._startX; // 마우스를 드래그한 만큼의 거리 계산
    this._offset = this._scrollStart - moveX; // 시작 위치에서 드래그한 만큼 빼기

    // 이동 범위를 제한하는 로직
    const maxScroll =
      this._keywordCategoryWrapper.scrollWidth - this._keywordCategoryWrapper.clientWidth;
    const minScroll = 0;

    if (this._offset < minScroll) {
      this._offset = minScroll; // 최소 위치 제한
    } else if (this._offset > maxScroll) {
      this._offset = maxScroll; // 최대 위치 제한
    }

    // `transform: translateX()`를 사용하여 이동
    this._keywordCategoryWrapper.style.transform = `translateX(-${this._offset}px)`;
  }

  // 드래그 종료 후 위치를 부드럽게 되돌리는 함수
  // TODO 수정(현재: min/max로 제한하기 때문에 '당겼다가 되돌아가는'거 없이 딱 그 위치까지만 당겨짐)
  _resetPosition() {
    // 애니메이션을 통한 부드러운 되돌리기
    const maxScroll =
      this._keywordCategoryWrapper.scrollWidth - this._keywordCategoryWrapper.clientWidth;
    const minScroll = 0;

    if (this._offset < minScroll) {
      this._offset = minScroll; // 최소 위치로 되돌리기
    } else if (this._offset > maxScroll) {
      this._offset = maxScroll; // 최대 위치로 되돌리기
    }

    // `transition`을 통해 부드럽게 원위치로 돌아가기
    this._keywordCategoryWrapper.style.transform = `translateX(-${this._offset}px)`;
  }

  // 키워드 리셋 이벤트를 상위 컴포넌트로 전달
  _handleResetKeyword(e) {
    const isChecked = e.target.checked;

    if (isChecked) {
      this.dispatchEvent(
        new CustomEvent('keyword-reset', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <div class="keyword section">
        <h2 class="a11y-hidden">가게 키워드 선택하기</h2>

        <div class="keyword__question">
          <strong class="keyword__question__text"> 어떤 점이 좋았나요? (1개~5개) </strong>
          <p class="keyword__question__text-desc">이 장소에 어울리는 키워드를 골라주세요.</p>
        </div>

        <div class="keyword__view">
          <div class="keyword__category-wrapper">
            ${this.keywordCategories.map(
              (category) => html`
                <review-write-keyword-category-element
                  .id=${category.id}
                  .name=${category.name}
                  .keywords=${category.keywords}
                  .selectedKeywords=${this.selectedKeywords}
                ></review-write-keyword-category-element>
              `
            )}

            <div class="keyword__category keyword__category--nothing">
              <h3 class="keyword__category-name"></h3>
              <ul class="keyword__list">
                <li class="">
                  <div class="keyword__item">
                    <input
                      type="checkbox"
                      class="keyword__item__checkbox"
                      id="keyword-check-nothing"
                      .checked="${this.selectedKeywords.length == 0}"
                      @change="${this._handleResetKeyword}"
                    />
                    <label
                      for="keyword-check-nothing"
                      class="keyword__item__label btn base rounded"
                    >
                      선택할 키워드가 없어요
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('review-write-keyword-element', ReviewWriteKeyword);
