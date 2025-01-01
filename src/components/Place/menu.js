import { LitElement, html, css } from 'lit';
import { getPbImageURL } from '@/api/getPbImageURL.js';
import commonStyles from '@/styles/common.js';
import { menuStyles } from './menuCss.js';

class Menu extends LitElement {
  static styles = [commonStyles, menuStyles];

  static properties = {
    totalMenuCount: { type: Number },
    menus: { type: Array },
    is_preview: { type: Boolean },
  };

  constructor() {
    super();
  }

  // 더보기 버튼 클릭 시
  _handleMoreClick() {
    this.dispatchEvent(
      new CustomEvent('preview-more-click', {
        detail: { type: 'menu' },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <section class="menu">
        <h2>
          <span>메뉴</span>
          <span class="menu-count">${this.totalMenuCount}</span>
        </h2>
        <ul class="list">
          ${this.menus.map(
            (item) => html`
              <li>
                <div class="image">
                  ${item.image
                    ? html`<figure>
                        <img src="${getPbImageURL(item)}" alt="" />
                        <figcaption class="a11y-hidden">${item.name} 사진</figcaption>
                      </figure>`
                    : ''}
                </div>
                <div class="info">
                  <p class="name">${item.name}</p>
                  <p class="price">${item.price.toLocaleString()}원</p>
                </div>
              </li>
            `
          )}
        </ul>

        ${this.is_preview
          ? html` <button @click="${this._handleMoreClick}" class="more-button">
              메뉴 더보기
            </button>`
          : ''}
      </section>
    `;
  }
}

customElements.define('menu-element', Menu);
