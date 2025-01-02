import { html, LitElement } from 'lit';
import { navgationStyles } from './navigationCss.js';
import commonStyles from '@/styles/common.js';

class Navigation extends LitElement {
  static properties = {
    active: { type: String },
  };

  static styles = [navgationStyles, commonStyles];

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  // 클릭 이벤트 함수
  _handleClickBtn(e) {
    const tabData = e.target.dataset.tab;

    if (tabData === this.active) return;
    this.active = tabData;

    this.dispatchEvent(
      new CustomEvent('active-change', {
        detail: { active: this.active },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="navigation-warp">
        <ul role="tablist">
          <li>
            <button
              id="tab_home"
              class="${this.active === 'tab-home' ? 'is--active' : ''}"
              aria-selected=${this.active === 'tab-home'}"
              aria-controls="panel_home"
              data-tab="tab-home"
              @click="${this._handleClickBtn}"
            >홈</button>
          </li>
          <li>
            <button
              id="tab_menu"
              class="${this.active === 'tab-menu' ? 'is--active' : ''}"
              aria-selected=${this.active === 'tab-menu'}"
              aria-controls="panel_menu"
              data-tab="tab-menu"
              @click="${this._handleClickBtn}"
            >
              메뉴
            </button>
          </li>
          <li>
            <button
              id="tab_review"
              class="${this.active === 'tab-review' ? 'is--active' : ''}"
              aria-selected=${this.active === 'tab-review'}"
              aria-controls="panel_review"
              data-tab="tab-review"
              @click="${this._handleClickBtn}"
            >
              리뷰
            </button>
          </li>
          <li>
            <button
              id="tab_image"
              class="${this.active === 'tab-image' ? 'is--active' : ''}"
              aria-selected=${this.active === 'tab-image'}"
              aria-controls="panel_image"
              data-tab="tab-image"
              @click="${this._handleClickBtn}"
            >
              사진
            </button>
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define('navigation-element', Navigation);
