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
    this._updateContentHeight();
  }

  // lit 라이프사이클 메서드
  updated() {
    this._updateContentHeight();
  }

  // 활성화 되면서 변경되는 tab-contents의 높이 자동 계산 반영
  _updateContentHeight() {
    console.log('Updating content height...');
    const activeContent = this.shadowRoot.querySelector(`${this.active}`);
    const contentsContainer = this.shadowRoot.querySelector('.tab-contents');

    if (activeContent && contentsContainer) {
      contentsContainer.style.height = `${activeContent.scrollHeight}px`;
    }
  }

  render() {
    return html`
      <nav class="tab">
        <ul class="tab-buttons" role="tablist">
          <li>
            <button
              @click="${this._handleTabBtn}"
              type="button"
              data-tab="tab-reserved"
              class="tab-button ${this.active === 'tab-reserved' ? 'is--active' : ''}"
              role="tab"
            >
              예약
            </button>
          </li>
          <li>
            <button
              @click="${this._handleTabBtn}"
              type="button"
              data-tab="tab-order"
              class="tab-button ${this.active === 'tab-order' ? 'is--active' : ''}"
              role="tab"
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
          role="tabpanel"
        >
          <h3 class="a11y-hidden">예약탭</h3>
          <category-tab></category-tab>
        </article>
        <article
          class="tab-content ${this.active === 'tab-order' ? 'is--active' : ''}"
          id="tab-order"
          role="tabpanel"
        >
          <h3 class="a11y-hidden">주문탭</h3>
          <order-page></order-page>
        </article>
      </section>
    `;
  }
}

customElements.define('tab-element', Tab);
