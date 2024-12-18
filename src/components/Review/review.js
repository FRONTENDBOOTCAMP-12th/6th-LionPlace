import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss';

import './header';
import './visitInfo.js';
import './wirteLike.js';
import './writeKeyword.js';
import './writeContent.js';
import './writeFooter.js';

class ReviewWrite extends LitElement {
  //static styles = [resetStyles, buttonStyles, reviewStyles];
  static styles = [
    //...reviewStyles,
    css`
      .review-write-form {
        font-weight: 600; /* label-semibold */

        width: 100%;
        box-sizing: border-box;
      }
    `,
  ];

  static properties = {
    keywordCategories: { type: Array },
  };

  constructor() {
    super();

    // TODO 삭제. 임시 데이터
    this.keywordCategories = [
      {
        id: 'keyword-1',
        name: '음식/가격',
        keywords: [
          {
            englishName: 'coffee',
            text: '음료가 맛있어요',
          },
          {
            englishName: 'cake',
            text: '디저트가 맛있어요',
          },
        ],
      },
      {
        id: 'keyword-2',
        name: '분위기',
        keywords: [
          {
            englishName: 'interior',
            text: '인테리어가 멋져요',
          },
        ],
      },
    ];
  }

  render() {
    return html`
      <form class="review-write-form">
        <review-header-element title="리뷰 쓰기"></review-header-element>
        <review-visit-info-element></review-visit-info-element>
        <review-write-like-element></review-write-like-element>
        <review-write-keyword-element
          .keywordCategories=${this.keywordCategories}
        ></review-write-keyword-element>
        <review-write-content-element></review-write-content-element>
        <review-write-footer-element></review-write-footer-element>
      </form>
    `;
  }
}

customElements.define('review-write-element', ReviewWrite);
