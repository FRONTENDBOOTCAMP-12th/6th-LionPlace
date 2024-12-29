import { LitElement, html, css } from 'lit';
import { followStyles } from './followCss';

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
        <span class="back-button">←</span>
        <span class="title">COOLION</span>
      </div>
      <div class="tabs">
        <div
          class="tab ${this.activeTab === 'following' ? 'active' : ''}"
          @click="${() => (this.activeTab = 'following')}"
        >
          팔로잉 3
        </div>
        <div
          class="tab ${this.activeTab === 'follower' ? 'active' : ''}"
          @click="${() => (this.activeTab = 'follower')}"
        >
          팔로워 0
        </div>
      </div>
      <div class="content">
        ${this.activeTab === 'following'
          ? html`<following-list></following-list>`
          : html`<follower-list></follower-list>`}
      </div>
    `;
  }
}

customElements.define('follow-info', FollowInfo);
