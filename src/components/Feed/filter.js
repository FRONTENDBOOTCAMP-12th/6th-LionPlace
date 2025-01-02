import { LitElement, html } from 'lit';
import { filterStyles } from './filterCss.js';

import commonStyles from '@/styles/common.js';
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

  static styles = [filterStyles];

  _filterPosts() {
    return this.posts.filter((post) => {
      const regionMatch = this.selectedRegion === '전체' || post.region === this.selectedRegion;
      const categoryMatch =
        this.selectedCategory === '전체' || post.category === this.selectedCategory;
      return regionMatch && categoryMatch;
    });
  }

  _selectRegion(region) {
    this.selectedRegion = region;
  }

  _selectCategory(category) {
    this.selectedCategory = category;
  }

  render() {
    const filteredPosts = this._filterPosts();

    return html`
      <!-- 지역 필터 -->
          <div class="filter-container">
            ${this.regions.map(
              (region) => html`
                <button
                  type="button"
                  class="filter-button ${this.selectedRegion === region ? 'selected' : ''}"
                  @click="${() => this._selectRegion(region)}"
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
                      @click="${() => this._selectCategory(category)}"
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
            </h2>
          </h2>
        </h2>
      </h2>
    `;
  }
}

customElements.define('filter-feed', FilterFeed);
