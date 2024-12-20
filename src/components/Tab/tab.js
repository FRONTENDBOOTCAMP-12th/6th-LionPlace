import { html, LitElement } from 'lit';
import { tabStyles } from './tabCss.js';
import resetStyles from '@/styles/reset.js';

class Tab extends LitElement {
  static properties = {
    active: { type: String, state: true },
  };

  constructor() {
    super();
    this.active = 'tab-reserved'; // 초기 활성화 설정
  }

  static styles = [resetStyles, tabStyles];

  handleTabBtn(e) {
    const targetTab = e.target.dataset.tab;
    this.active = targetTab;
  }

  render() {
    return html`
      <div>
        <div class="tabs">
          <nav>
            <ul class="tab-buttons">
              <li>
                <button
                  @click="${this.handleTabBtn}"
                  type="button"
                  data-tab="tab-reserved"
                  class="tab-button ${this.active === 'tab-reserved' ? 'is--active' : ''}"
                >
                  예약
                </button>
              </li>
              <li>
                <button
                  @click="${this.handleTabBtn}"
                  type="button"
                  data-tab="tab-order"
                  class="tab-button ${this.active === 'tab-order' ? 'is--active' : ''}"
                >
                  주문
                </button>
              </li>
            </ul>
          </nav>

          <section class="tab-contents">
            <h2 class="a11y-hidden">탭 컨텐츠입니다.</h2>
            <article
              class="tab-content ${this.active === 'tab-reserved' ? 'is--active' : ''}"
              id="tab-reserved"
            >
              <category-tab></category-tab>
            </article>
            <article
              class="tab-content ${this.active === 'tab-order' ? 'is--active' : ''}"
              id="tab-order"
            >
              탭 2의 내용입니다.
              <my-custom-element></my-custom-element>
            </article>
          </section>
        </div>
      </div>
    `;
  }
}

customElements.define('order-tab', Tab);
