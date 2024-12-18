import { LitElement, html, css } from 'lit';
import { savedStyles } from './savedPlacesCss';

import './app';
import './listIcons';
import './navBar';
import './placeList';
import './saved';

export class SavedPlace extends LitElement {
  static properties = {
    placeName: { type: String },
    address: { type: String },
    category: { type: String },
    imageUrl: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      border-bottom: 1px solid #f0f0f0;
    }
    .place-item {
      display: flex;
      padding: 16px;
      gap: 16px;
    }
    .image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      background-size: cover;
      background-position: center;
    }
    .content {
      flex: 1;
    }
    .name {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    .info {
      font-size: 14px;
      color: #8e8e8e;
    }
  `;

  render() {
    return html`
      <div class="place-item">
        <div class="image" style="background-image: url(${this.imageUrl})"></div>
        <div class="content">
          <div class="name">${this.placeName}</div>
          <div class="info">${this.category}</div>
          <div class="info">${this.address}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('saved-element', SavedPlace);
