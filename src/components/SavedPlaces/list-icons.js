import { LitElement, html, css } from "lit";

export class ListIcons extends LitElement {
  static properties = {
    name: { type: String },
  };

  static styles = css`
    :host {
      display: inline-block;
      width: 24px;
      height: 24px;
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
      case "star":
        return html` <img src="/src/assets/star.svg" alt="내 장소" class="my-place" />`;
      case "heart":
        return html` <img src="/src/assets/heart-solid.svg" alt="좋아요 장소" class="liked-place" />`;
      case "check":
        return html` <img src="/src/assets/check.svg" alt="가봐야할 장소" class="should-place" />`;
      case "pin":
        return html`
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
          </svg>
        `;
      default:
        return html``;
    }
  }
}

customElements.define("list-icons", ListIcons);
