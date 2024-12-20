import { LitElement, html, css } from 'lit';
import { reviewStyles } from './reviewCss';
import './writeKeywordList';

class ReviewWriteKeywordCategory extends LitElement {
  static styles = [
    ...reviewStyles,
    css`
      .keyword__category {
        padding-left: 1.25rem;
        flex-grow: 1;
        display: inline-block;
        box-sizing: border-box;

        .keyword__category__name {
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
    `,
  ];

  static properties = {
    id: { type: String },
    name: { type: String },
    keywords: { type: Array },
    selectedKeywords: { type: Array },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="keyword__category keyword__category--category-${this.id}">
        <h3 class="keyword__category__name">${this.name}</h3>
        <review-write-keyword-list-element
          .keywords=${this.keywords}
          .selectedKeywords=${this.selectedKeywords}
        ></review-write-keyword-list-element>
      </div>
    `;
  }
}

customElements.define('review-write-keyword-category-element', ReviewWriteKeywordCategory);
