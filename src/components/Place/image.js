import { LitElement, html, css } from 'lit';
import { getPbImageURL } from '@/api/getPbImageURL.js';
import commonStyles from '@/styles/common.js';
import { imageStyles } from './imageCss.js';

class Image extends LitElement {
  static styles = [commonStyles, imageStyles];

  static properties = {
    images: { type: Array },
  };

  constructor() {
    super();
  }

  // 더보기 버튼 클릭 시
  _handleMoreClick() {
    this.dispatchEvent(
      new CustomEvent('preview-more-click', {
        detail: { type: 'image' },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <section class="image-section">
        <h2>방문자 사진</h2>
        <ul class="list">
          ${this.images.map(
            (item) => html`
              <li class="image">
                ${item.image
                  ? html`<figure>
                      <img src="${getPbImageURL(item)}" alt="" />
                      <figcaption class="a11y-hidden">리뷰 사진</figcaption>
                    </figure>`
                  : ''}
              </li>
            `
          )}
        </ul>
        ${this.is_preview
          ? html` <button @click="${this._handleMoreClick}" class="more-button">
              방문자 사진 더보기
            </button>`
          : ''}
      </section>
    `;
  }
}

customElements.define('image-element', Image);
