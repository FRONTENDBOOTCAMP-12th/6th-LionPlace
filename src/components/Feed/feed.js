import { LitElement, html } from 'lit';
import { feedStyles } from './feedCss';

import '@/components/Feed/navBar.js';
import '@/components/Feed/post.js';
import '@/components/Feed/filter.js';

export class Feed extends LitElement {
  constructor() {
    super();

    // 임시 데이터
    this.posts = [
      {
        region: '망원',
        category: '한식',
        profileImage: '/images/img_profile.jpg',
        username: '멋쟁이사자처럼',
        date: '사진리뷰 2 ・ 3.1.수',
        postImage: '/images/img_product1.jpg',
        content:
          '주말엔 매일 줄 서 있어서 먹을 수가 없었는데 평일에 다행히 갈 수 있어서 너무 좋았어요! 좀 안기다리고 먹었는데 와 너무 맛있었습니다!! 괜히 또간집에서 나온 곳이 아니구나...주말엔 매일 줄 서 있어서 먹을 수가 없었는데 평일에 다행히 갈 수 있어서 너무 좋았어요! 좀 안기다리고 먹었는데 와 너무 맛있었습니다!!',
      },
      {
        region: '홍익대',
        category: '양식',
        profileImage: '/images/img_profile.jpg',
        username: '멋쟁이사자처럼',
        date: '사진리뷰 2 ・ 3.1.수',
        postImage: '/images/img_product1.jpg',
        content:
          '주말엔 매일 줄 서 있어서 먹을 수가 없었는데 평일에 다행히 갈 수 있어서 너무 좋았어요! 좀 안기다리고 먹었는데 와 너무 맛있었습니다!! 괜히 또간집에서 나온 곳이 아니구나...주말엔 매일 줄 서 있어서 먹을 수가 없었는데 평일에 다행히 갈 수 있어서 너무 좋았어요! 좀 안기다리고 먹었는데 와 너무 맛있었습니다!! 괜히 또간집에서 나온 곳이 아니구나...',
      },
    ];
  }

  render() {
    return html`
      <filter-feed .posts="${this.posts}"></filter-feed>
      <nav-bar></nav-bar>
    `;
  }
}

customElements.define('feed-page', Feed);
