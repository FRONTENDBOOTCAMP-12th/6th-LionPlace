import { html, LitElement } from 'lit';
import { tabStyles } from './tabCss.js';
import commonStyles from '@/styles/common.js';

class Tab extends LitElement {
  static properties = {
    active: { type: String, state: true },
  };

  constructor() {
    super();
    this.active = 'tab-reserved'; // 초기 활성화 설정
  }

  static styles = [commonStyles, tabStyles];

  // 클릭 이벤트 함수 => data-tab 접근해 활성화 상태 제어함
  _handleTabBtn(e) {
    const targetTab = e.target.dataset.tab;
    this.active = targetTab;
  }

  render() {
    return html`
      <nav class="tab">
        <ul class="tab-buttons" role="tablist">
          <li role="presentation">
            <button
              @click="${this._handleTabBtn}"
              type="button"
              class="tab-button ${this.active === 'tab-reserved' ? 'is--active' : ''}"
              role="tab"
              data-tab="tab-reserved"
              aria-selected="${this.active === 'tab-reserved'}"
              tabindex="${this.active === 'tab-reserved' ? '0' : '-1'}"
            >
              예약
            </button>
          </li>
          <li role="presentation">
            <button
              @click="${this._handleTabBtn}"
              type="button"
              class="tab-button ${this.active === 'tab-order' ? 'is--active' : ''}"
              role="tab"
              data-tab="tab-order"
              aria-selected="${this.active === 'tab-order'}"
              tabindex="${this.active === 'tab-order' ? '0' : '-1'}"
            >
              주문
            </button>
          </li>
        </ul>
      </nav>

      <section class="tab-contents">
        <h2 class="a11y-hidden">탭 컨텐츠</h2>
        <article
          class="tab-content ${this.active === 'tab-reserved' ? 'is--active' : ''}"
          id="tab-reserved"
          aria-labelledby="tab-reserved"
        >
          <h3 class="a11y-hidden">예약탭</h3>
          <category-tab></category-tab>
        </article>
        <article
          class="tab-content ${this.active === 'tab-order' ? 'is--active' : ''}"
          id="tab-order"
          aria-labelledby="tab-order"
        >
          <h3 class="a11y-hidden">주문탭</h3>
          <order-page></order-page>
        </article>
      </section>
    `;
  }
}

customElements.define('tab-element', Tab);
