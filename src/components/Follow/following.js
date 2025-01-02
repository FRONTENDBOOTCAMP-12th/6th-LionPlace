import { LitElement, html } from 'lit';
import { followingStyles } from './followingCss.js';
import commonStyles from '@/styles/common.js';
import pb from '@/api/pocketbase';

class FollowingList extends LitElement {
  static properties = {
    followingList: { type: Array },
  };

  constructor() {
    super();
    this.followingList = [];
  }

  static styles = [followingStyles, commonStyles];

  // PocketBase 데이터 가져오기
  async connectedCallback() {
    super.connectedCallback();
    await this._fetchFollowingData();
  }

  // PocketBase에서 데이터 가져오는 함수
  async _fetchFollowingData() {
    try {
      // PocketBase의 'following' 컬렉션에서 데이터 가져오기
      const response = await pb.collection('following').getFullList();

      this.followingList = response.map((user) => ({
        id: user.id,
        name: user.username,
        img: user.profileImage
          ? pb.files.getURL(user, user.profileImage)
          : '/images/default-profile.png',
      }));
    } catch (error) {
      console.error('팔로잉 데이터를 가져오는 중 오류 발생:', error);
    }
  }

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
