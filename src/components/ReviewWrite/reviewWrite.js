import { LitElement, html, css } from 'lit';
import { reviewWriteStyles } from './reviewWriteCss.js';

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
          text: '사진이 잘 나와요',
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
    ...reviewWriteStyles,
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

  // DOM에 연결될 때 호출
  connectedCallback() {
    super.connectedCallback();

    // 브라우저 뒤로가기 및 페이지 나가기 시 확인을 요청
    this._addUnloadListener();
  }

  // DOM에서 제거될 때 호출
  disconnectedCallback() {
    super.disconnectedCallback();

    // 브라우저의 나가기 시 발생하는 이벤트 제거
    this._removeUnloadListener();
  }

  // 브라우저의 나가기 및 뒤로가기 시 확인 이벤트 추가
  _addUnloadListener() {
    window.addEventListener('beforeunload', this._handleBeforeUnload);
  }

  // 브라우저의 나가기 및 뒤로가기 시 확인 이벤트 제거
  _removeUnloadListener() {
    window.removeEventListener('beforeunload', this._handleBeforeUnload);
  }

  // 브라우저의 나가기 시 이벤트
  _handleBeforeUnload(e) {
    // `returnValue`에 값을 설정하여 기본 확인 메시지 표시
    const message = '사이트에서 나가시겠습니까?';
    e.returnValue = message; // 표준 방식
    return message; // 일부 브라우저에 필요
  }

  // 닫기 버튼 클릭
  _handleCloseClick(e) {
    // 이전 페이지로 돌아가기
    window.history.back();
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

  // TODO 수정 - 등록
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
        <review-header-element @close-click="${this._handleCloseClick}" .title="${'리뷰 쓰기'}">
          <!-- <span slot="title">리뷰 쓰기</span> -->
        </review-header-element>
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
          .maxLength=${ReviewWrite.MAX_CONTENT_LENGTH}
        ></review-write-content-element>
        <review-write-footer-element
          @submit-click=${this._handleSubmit}
        ></review-write-footer-element>
      </form>
    `;
  }
}

customElements.define('review-write-element', ReviewWrite);
