import { LitElement, html } from 'lit';
import { followStyles } from './followCss.js';

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

  static styles = [followStyles];

  render() {
    return html`
      <div class="header">
        <button class="back-button" type="button">←</button>
        <span class="title">COOLION</span>
      </div>
      <nav class="tabs">
        <button
          class="tab ${this.activeTab === 'following' ? 'active' : ''}"
          @click="${() => (this.activeTab = 'following')}"
        >
          팔로잉 3
        </button>
        <button
          class="tab ${this.activeTab === 'follower' ? 'active' : ''}"
          @click="${() => (this.activeTab = 'follower')}"
        >
          팔로워 0
        </button>
      </nav>
      <div class="content">
        ${this.activeTab === 'following'
          ? html`<following-list></following-list>`
          : html`<follower-list></follower-list>`}
      </div>
    `;
  }
}

customElements.define('follow-info', FollowInfo);
