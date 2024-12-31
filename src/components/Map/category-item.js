import { html, LitElement } from 'lit';
import { mapStyles } from './mapCss.js';
import commonStyle from '@/styles/common.js';

class CategoryItem extends LitElement {
  static properties = {
    categoryInfo: { type: Object },
    on: { type: Boolean },
  };

  static styles = [commonStyle, mapStyles];

  constructor() {
    super();
  }

  // 카테고리를 클릭했을 때 호출되는 함수
  _onClick() {
    this.dispatchEvent(
      new CustomEvent('category-click', {
        detail: { category: this.categoryInfo },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <li>
        <button class="category-btn btn rounded ${this.on ? 'on' : ''}" @click=${this._onClick}>
          <img
            src="/images/places/categories/ico_${this.categoryInfo.icon}.svg"
            role="presentation"
            alt=""
          />
          <span>${this.categoryInfo.name}</span>
        </button>
      </li>
    `;
  }
}

customElements.define('category-item-element', CategoryItem);
