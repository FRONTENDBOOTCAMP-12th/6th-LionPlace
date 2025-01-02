import { LitElement, html } from 'lit';
import { postStyles } from './postCss.js';

import commonStyles from '@/styles/common.js';

class PostComponent extends LitElement {
  static properties = {
    profileImage: { type: String },
    username: { type: String },
    date: { type: String },
    postImage: { type: String },
    content: { type: String },
    liked: { type: Boolean },
    expanded: { type: Boolean },
  };

  constructor() {
    super();
    this.profileImage = '';
    this.username = '';
    this.date = '';
    this.postImage = '';
    this.content = '';
    this.liked = false;
    this.expanded = false;
  }

  static styles = [postStyles];

  toggleLike() {
    this.liked = !this.liked;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  render() {
    return html`
      <div class="post-container">
        <div class="post-header">
          <div class="user-info">
            <img class="profile-image" src="${this.profileImage}" alt="프로필" />
            <div class="user-details">
              <span class="username">${this.username}</span>
              <span class="date">${this.date}</span>
            </div>
          </div>
          <div class="like-icon">
            <button
              type="button"
              id="like-button"
              class="${this.liked ? 'liked' : ''}"
              @click="${this.toggleLike}"
            ></button>
          </div>
        </div>

        <img class="post-image" src="${this.postImage}" alt="방문자 리뷰 사진" />

        <p class="post-content ${this.expanded ? 'expanded' : ''}">${this.content}</p>
        ${this.content.length > 100
          ? html`
              <button type="button" class="more-button" @click="${this.toggleExpand}">
                ${this.expanded ? '접기' : '더보기'}
              </button>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('post-component', PostComponent);
