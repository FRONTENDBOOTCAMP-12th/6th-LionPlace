import { LitElement, html, css } from 'lit';
import commonStyles from '@/styles/common.js';
import { headerStyles } from './headerCss.js';

class Header extends LitElement {
  static styles = [commonStyles, headerStyles];

  static properties = {
    title: { type: String },
    placeName: { type: String },
    backY: { type: Boolean },
  };

  constructor() {
    super();
  }

  // 뒤로가기 버튼 클릭
  _handleBackClick(e) {
    this.dispatchEvent(
      new CustomEvent('back-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  // 닫기 버튼 클릭
  _handleCloseClick(e) {
    this.dispatchEvent(
      new CustomEvent('close-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <header>
        ${this.backY
          ? html`
              <button type="button" class="back-btn btn" @click="${this._handleBackClick}">
                <svg
                  role="img"
                  aria-labelledby="back-text"
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title id="back-text">뒤로가기</title>
                  <path
                    d="M6.7334 15.0669L0.600065 8.93356C0.466731 8.80023 0.372509 8.65578 0.317398 8.50023C0.261398 8.34467 0.233398 8.178 0.233398 8.00023C0.233398 7.82245 0.261398 7.65578 0.317398 7.50023C0.372509 7.34467 0.466731 7.20023 0.600065 7.06689L6.7334 0.933561C6.97784 0.689116 7.28895 0.566895 7.66673 0.566895C8.04451 0.566895 8.35562 0.689116 8.60007 0.933561C8.84451 1.17801 8.96673 1.48912 8.96673 1.86689C8.96673 2.24467 8.84451 2.55578 8.60007 2.80023L3.40007 8.00023L8.60007 13.2002C8.84451 13.4447 8.96673 13.7558 8.96673 14.1336C8.96673 14.5113 8.84451 14.8224 8.60007 15.0669C8.35562 15.3113 8.04451 15.4336 7.66673 15.4336C7.28895 15.4336 6.97784 15.3113 6.7334 15.0669Z"
                    fill="black"
                  />
                </svg>
              </button>
            `
          : ''}
        ${this.title ? html`<h1 class="title">${this.title}</h1>` : ''}
        ${this.placeName ? html`<h2 class="place-name">${this.placeName}</h2>` : ''}

        <button type="button" class="close-btn btn" @click="${this._handleCloseClick}">
          <svg
            role="img"
            aria-labelledby="close-text"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="close-text">닫기</title>
            <path
              d="M13 13L7 7M7 7L1 1M7 7L13 1M7 7L1 13"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </header>
    `;
  }
}

customElements.define('header-element', Header);
