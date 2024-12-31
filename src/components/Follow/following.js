import { LitElement, html } from 'lit';
import { followingStyles } from './followingCss.js';
import commonStyles from '@/styles/common.js';

class FollowingList extends LitElement {
  static properties = {
    followingList: { type: Array },
  };

  constructor() {
    super();
    this.followingList = [
      { id: 1, name: 'User1', img: '' },
      { id: 2, name: 'User2', img: '' },
      { id: 3, name: 'User3', img: '' },
    ];
  }

  static styles = [followingStyles, commonStyles];

  render() {
    return html`
      <ul class="list">
        ${this.followingList.map(
          (user) => html`
            <li class="list-item">
              <div class="profile">
                <img src="${user.img}" alt="${user.name}" />
                <span class="username">${user.name}</span>
              </div>
              <button type="button" class="follow-button">팔로우</button>
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define('following-list', FollowingList);
