import { LitElement, html, css } from 'lit';

class PostComponent extends LitElement {
  static properties = {
    profileImage: { type: String },
    username: { type: String },
    date: { type: String },
    postImage: { type: String },
    content: { type: String },
  };

  static styles = css`
    .post-container {
      background: white;
      margin-bottom: 20px;
      border-radius: 15px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      padding: 16px 16px 12px 16px;
    }

    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .profile-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f0f0f0;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .username {
      font-weight: 600;
      font-size: 16px;
      color: #262626;
    }

    .date {
      font-size: 12px;
      color: #737373;
    }

    .heart-icon {
      font-size: 24px;
      color: #262626;
      cursor: pointer;
    }

    .post-image {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .post-content {
      font-size: 14px;
      line-height: 1.5;
      color: #262626;
      white-space: pre-wrap;
    }

    .more-button {
      color: #737373;
      font-size: 14px;
      margin-top: 8px;
      cursor: pointer;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
    }
  `;

  constructor() {
    super();
    this.profileImage = '';
    this.username = '';
    this.date = '';
    this.postImage = '';
    this.content = '';
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
            <button id="like-button">
              <img src="/images/ico_like.svg" alt="좋아요" />
            </button>
          </div>
        </div>

        <img class="post-image" src="${this.postImage}" alt="게시글 이미지" />

        <div class="post-content">${this.content}</div>
        <div class="more-button">더보기</div>
      </div>
    `;
  }
}

customElements.define('post-component', PostComponent);
