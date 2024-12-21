import { LitElement, html, css } from 'lit';
import resetStyles from '@/styles/reset.js';

import '@/components/Feed/post.js';

export class FilterFeed extends LitElement {
  static properties = {
    posts: { type: Array }, // 부모로부터 전달받을 게시글 데이터
    selectedRegion: { type: String },
    selectedCategory: { type: String },
    regions: { type: Array },
    categories: { type: Array },
  };

  constructor() {
    super();
    this.posts = []; // 기본값은 빈 배열
    this.selectedRegion = '전체';
    this.selectedCategory = '전체';
    this.regions = ['전체', '신촌', '홍익대', '합정역', '망원'];
    this.categories = ['전체', '한식', '중식', '양식', '카페', '일식'];
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      padding-bottom: 4rem;
      background-color: white;
    }

    .filter-container {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      overflow-x: auto;
      white-space: nowrap;
      padding-bottom: 0.5rem;

      /* 스크롤바 숨기기(모바일 및 웹 환경) */
      -ms-overflow-style: none;
    }

    .filter-container::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }

    .filter-button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 1rem;
      background-color: #f9f9f9;
      color: #333;
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
      flex-shrink: 0;
    }

    .filter-button.selected {
      background-color: #171f31;
      color: white;
    }

    .feed-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `;

  filterPosts() {
    return this.posts.filter((post) => {
      const regionMatch = this.selectedRegion === '전체' || post.region === this.selectedRegion;
      const categoryMatch =
        this.selectedCategory === '전체' || post.category === this.selectedCategory;
      return regionMatch && categoryMatch;
    });
  }

  selectRegion(region) {
    this.selectedRegion = region;
  }

  selectCategory(category) {
    this.selectedCategory = category;
  }

  render() {
    const filteredPosts = this.filterPosts();

    return html`
      <!-- 지역 필터 -->
      <div class="filter-container">
        ${this.regions.map(
          (region) => html`
            <button
              type="button"
              class="filter-button ${this.selectedRegion === region ? 'selected' : ''}"
              @click="${() => this.selectRegion(region)}"
            >
              ${region}
            </button>
          `
        )}
      </div>

      <!-- 음식 종류 필터 -->
      <div class="filter-container">
        ${this.categories.map(
          (category) => html`
            <button
              type="button"
              class="filter-button ${this.selectedCategory === category ? 'selected' : ''}"
              @click="${() => this.selectCategory(category)}"
            >
              ${category}
            </button>
          `
        )}
      </div>

      <!-- 필터링된 게시글 -->
      <div class="feed-container">
        ${filteredPosts.map(
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

customElements.define('filter-feed', FilterFeed);
