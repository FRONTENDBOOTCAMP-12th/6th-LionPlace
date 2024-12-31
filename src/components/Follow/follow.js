import { LitElement, html } from 'lit';
import { followStyles } from './followCss.js';
import commonStyles from '@/styles/common.js';

import './follower.js';
import './following.js';

class FollowInfo extends LitElement {
  static properties = {
    activeTab: { type: String },
  };

  constructor() {
    super();
    this.activeTab = 'following';
  }

  static styles = [followStyles, commonStyles];

  render() {
    return html`
      <section class="follow-section">
        <h2 class="a11y-hidden">팔로잉</h2>
        <article class="follow-section__top">
          <h3 class="a11y-hidden" aria-hidden="true">뒤로가기</h3>
          <button @click=${() => history.back()} type="button" aria-label="뒤로가기">
            <img src="/images/ico_arrow_left.svg" alt="" role="presentation" />
            <span>COOLION</span>
          </button>
        </article>

        <nav class="tabs">
          <ul>
            <li>
              <button
                class="tab ${this.activeTab === 'following' ? 'is--active' : ''}"
                @click="${() => (this.activeTab = 'following')}"
                type="button"
              >
                팔로잉 3
              </button>
            </li>
            <li>
              <button
                class="tab ${this.activeTab === 'follower' ? 'is--active' : ''}"
                @click="${() => (this.activeTab = 'follower')}"
                type="button"
              >
                팔로워 0
              </button>
            </li>
          </ul>
        </nav>
        <div class="content">
          ${this.activeTab === 'following'
            ? html`<following-list></following-list>`
            : html`<follower-list></follower-list>`}
        </div>
      </section>
    `;
  }
}

customElements.define('follow-info', FollowInfo);
