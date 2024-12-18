import { LitElement, html, css } from "lit";
import "./list-icons.js";

export class PlaceList extends LitElement {
  static properties = {
    id: { type: String },
    icon: { type: String },
    title: { type: String },
    places: { type: Number },
    followers: { type: Number },
    views: { type: Number },
    isPrivate: { type: Boolean },
  };

  static styles = css`
    .list-item {
      display: flex;
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
    }
    .icon {
      width: 40px;
      height: 40px;
      background-color: #f8f9fa;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }
    .content {
      flex: 1;
    }
    .title {
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
      <div class="list-item" @click="${this._handleClick}">
        <div class="icon">
          <list-icons name="${this.icon}"></list-icons>
        </div>
        <div class="content">
          <div class="title">${this.title}</div>
          <div class="info">저장된 장소 ${this.places}개 ${this.isPrivate ? "· 비공개" : `· 팔로워 ${this.followers}명 · 조회 ${this.views}회`}</div>
        </div>
      </div>
    `;
  }

  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("list-click", {
        detail: { id: this.id },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("place-list", PlaceList);
