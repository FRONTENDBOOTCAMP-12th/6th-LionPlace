import { LitElement, html, css } from 'lit';
import '@/components/Feed/post.js';

export class FeedPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: white;
    }
    .feed-container {
      max-width: 470px;
      margin: 0 auto;
    }
  `;

  constructor() {
    super();
    this.posts = [
      {
        profileImage: '/images/ico_profile.jpg',
        username: '멋쟁이사자처럼',
        date: '사자리뷰 2 ・ 3.1.수',
        postImage: '/images/pizza.jpg',
        content:
          '주말엔 매일 줄 서 있어서 먹을 수가 없었는데 평일에 다행히 갈 수 있어서 너무 좋았어요! 좀 안기다리고 먹었는데 와 너무 맛있었습니다!! 괜히 또간집에서 나온 곳이 아니구나...',
      },
      {
        profileImage: '/images/ico_profile.jpg',
        username: '멋쟁이사자처럼',
        date: '사자리뷰 2 ・ 3.1.수',
        postImage: '/images/pizza.jpg',
        content:
          '주말엔 매일 줄 서 있어서 먹을 수가 없었는데 평일에 다행히 갈 수 있어서 너무 좋았어요! 좀 안기다리고 먹었는데 와 너무 맛있었습니다!! 괜히 또간집에서 나온 곳이 아니구나...',
      },
    ];
  }

  render() {
    return html`
      <div class="feed-container">
        ${this.posts.map(
          (post) => html`
            <post-component
              profileImage="${post.profileImage}"
              username="${post.username}"
              date="${post.date}"
              postImage="${post.postImage}"
              content="${post.content}"
            ></post-component>
          `
        )}
      </div>
    `;
  }
}

customElements.define('feed-page', FeedPage);
