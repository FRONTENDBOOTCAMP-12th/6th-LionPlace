import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss';

import './header.js';
import './visitInfo.js';
import './wirteLike.js';
import './writeKeyword.js';
import './writeContent.js';
import './writeFooter.js';

// TODO 삭제 - 임시 데이터
const data = {
  visitInfo: {
    name: '라이언 카페',
    startDate: '2024.12.18 (수)', // new Date('2024-12-18')
    count: 3,
    itemName: '아메리카노 외 3개',
  },
  keywordCategories: [
    {
      id: 'foodAndPrice',
      name: '음식/가격',
      keywords: [
        {
          id: 'desert',
          imageEnglishName: 'cake',
          text: '디저트가 맛있어요',
        },
        {
          id: 'coffee',
          imageEnglishName: 'coffee',
          text: '커피가 맛있어요',
        },
        {
          id: 'drink',
          imageEnglishName: 'drink',
          text: '음료가 맛있어요',
        },
      ],
    },
    {
      id: 'mood',
      name: '분위기',
      keywords: [
        {
          id: 'interior',
          imageEnglishName: 'couch',
          text: '인테리어가 멋져요',
        },
        {
          id: 'picture',
          imageEnglishName: 'camera',
          text: '사진이 잘 나와와요',
        },
      ],
    },
    {
      id: 'other',
      name: '기타',
      keywords: [
        {
          id: 'kind',
          imageEnglishName: 'heart',
          text: '친절해요',
        },
      ],
    },
  ],
};

class ReviewWrite extends LitElement {
  static MAX_CONTENT_LENGTH = 400; // 리뷰 내용 최대 글자 수(상수)

  static styles = [
    ...reviewStyles,
    css`
      .review-write-form {
        font-weight: 600; /* label-semibold */

        width: 100%;
        box-sizing: border-box;
      }
    `,
  ];

  static properties = {
    visitInfo: { type: Object },
    keywordCategories: { type: Array },
    isLike: { type: Boolean },
    selectedKeywords: { type: Array },
    content: { type: String },
  };

  constructor() {
    super();
    this.visitInfo = { ...data.visitInfo };
    this.keywordCategories = [...data.keywordCategories];
    this.isLike = false;
    this.selectedKeywords = [];
    this.content = '';
  }

  // 좋아요 상태 토글
  _handleLikeToggle() {
    this.isLike = !this.isLike; // 상태 토글
  }

  // 키워드 선택/해제
  _handleKeywordChange(e) {
    const { keyword, isChecked } = e.detail;

    // 키워드가 체크된 경우
    if (isChecked) {
      this.selectedKeywords = [...this.selectedKeywords, keyword];
    } else {
      // 키워드가 체크 해제된 경우
      this.selectedKeywords = this.selectedKeywords.filter((k) => k.id !== keyword.id);
    }
  }

  // 키워드 초기화
  _handleKeywordReset(e) {
    this.selectedKeywords = [];
  }

  // 등록
  _handleSubmit(e) {
    console.log(
      '좋아요 상태: ',
      this.isLike,
      ', 키워드: ',
      this.selectedKeywords,
      ', 내용: ',
      this.content
    );

    alert('작업 예정');
    e.preventDefault();
  }

  render() {
    return html`
      <form class="review-write-form">
        <review-header-element .title="${'리뷰 쓰기'}"></review-header-element>
        <review-visit-info-element .visitInfo=${this.visitInfo}></review-visit-info-element>
        <review-write-like-element
          @like-change=${this._handleLikeToggle}
        ></review-write-like-element>
        <review-write-keyword-element
          .keywordCategories=${this.keywordCategories}
          .selectedKeywords=${this.selectedKeywords}
          @keyword-change="${this._handleKeywordChange}"
          @keyword-reset="${this._handleKeywordReset}"
        ></review-write-keyword-element>
        <review-write-content-element
          .content=${this.content}
          .maxCount=${ReviewWrite.MAX_CONTENT_LENGTH}
        ></review-write-content-element>
        <review-write-footer-element
          @submit-click=${this._handleSubmit}
        ></review-write-footer-element>
      </form>
    `;
  }
}

customElements.define('review-write-element', ReviewWrite);
