import { LitElement, html, css } from 'lit';
import resetStyles from '@/styles/reset.js';

export class ListIcons extends LitElement {
  static properties = {
    name: { type: String },
  };

  static styles = css`
    :host {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`${this._getIcon()}`;
  }

  _getIcon() {
    switch (this.name) {
      case 'star':
        return html` <img src="/images/ico_star.svg" alt="내 장소" class="my-place" />`;
      case 'heart':
        return html` <img
          src="/images/ico_heart-solid.svg"
          alt="좋아요 장소"
          class="liked-place"
        />`;
      case 'check':
        return html` <img src="/images/ico_check.svg" alt="가봐야할 장소" class="should-place" />`;
      case 'plus':
        return html` <img src="/images/ico_pin.svg" alt="추가 장소" class="plus-place" />`;
      default:
        return html``;
    }
  }
}

customElements.define('list-icons', ListIcons);
