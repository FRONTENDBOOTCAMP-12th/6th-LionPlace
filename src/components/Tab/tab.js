import { css, html, LitElement } from 'lit';
import resetStyles from '/src/styles/reset';
import { tabStyles } from './tabCss';

class Tab extends LitElement {
  static properties = {
    activeBtn: { state: true },
    activeCtn: { state: true },
  };

  constructor() {
    super();
    this.activeBtn = 'tab-reserved';
    this.activeCtn = 'tab-reserved';
  }

  static styles = [
    resetStyles,
    tabStyles,
    css`
      .tab-buttons {
        button {
          &.is--active {
            background-color: var(--primary);
            color: var(--white);
            z-index: 2;
            border-radius: 1rem;

            &::before {
              background-color: var(--white);
            }
          }
        }
      }

      .tab-content {
        display: none;

        &.is--active {
          display: block;
        }
      }
    `,
  ];

  handleTabBtn(e) {
    const targetTab = e.target.dataset.tab;
    this.activeBtn = targetTab;
    this.activeCtn = targetTab;
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
                  class="tab-button ${this.activeBtn === 'tab-reserved' ? 'is--active' : ''}"
                >
                  예약
                </button>
              </li>
              <li>
                <button
                  @click="${this.handleTabBtn}"
                  type="button"
                  data-tab="tab-order"
                  class="tab-button ${this.activeBtn === 'tab-order' ? 'is--active' : ''}"
                >
                  주문
                </button>
              </li>
            </ul>
          </nav>

          <section class="tab-contents">
            <h2 class="a11y-hidden">탭 컨텐츠입니다.</h2>
            <article
              class="tab-content ${this.activeCtn === 'tab-reserved' ? 'is--active' : ''}"
              id="tab-reserved"
            >
              탭 1의 내용입니다.
              <my-custom-element></my-custom-element>
            </article>
            <article
              class="tab-content ${this.activeCtn === 'tab-order' ? 'is--active' : ''}"
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
