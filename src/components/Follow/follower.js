import { LitElement, html, css } from 'lit';
import { followerStyles } from './followerCss';

class FollowerList extends LitElement {
  static properties = {
    followerList: { type: Array },
  };

  constructor() {
    super();
    this.followerList = [];
  }

  static styles = [followerStyles];

  render() {
    return html`
      <div class="list">
        ${this.followerList.length === 0
          ? html`
              <div class="empty-state">
                <img src="/public/images/ico_users.svg" />
                <p>아직 팔로워가 없습니다</p>
              </div>
            `
          : this.followerList.map(
              (user) => html`
                <div class="list-item">
                  <div class="profile">
                    <img src="${user.img}" alt="${user.name}" />
                    <span class="username">${user.name}</span>
                  </div>
                </div>
              `
            )}
      </div>
    `;
  }
}

customElements.define('follower-list', FollowerList);
