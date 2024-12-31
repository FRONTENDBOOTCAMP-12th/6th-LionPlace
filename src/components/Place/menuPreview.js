import { LitElement, html, css } from 'lit';
import { getPbImageURL } from '@/api/getPbImageURL';
import commonStyles from '@/styles/common.js';
import { menuPreviewStyles } from './menuPreviewCss.js';

class MenuPreview extends LitElement {
  static styles = [commonStyles, menuPreviewStyles];

  static properties = {
    totalMenuCount: { type: Number },
    menus: { type: Array },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <section class="menu-preview">
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
        <button @click="${this._handleMoreClick}" class="more-button">메뉴 더보기</button>
      </section>
    `;
  }
}

customElements.define('menu-preview', MenuPreview);
