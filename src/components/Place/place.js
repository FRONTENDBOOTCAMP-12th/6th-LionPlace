import { LitElement, html, css } from 'lit';
import pb from '@/api/pocketbase.js';
import { getPbImageURL } from '@/api/getPbImageURL.js';
import commonStyles from '@/styles/common.js';
import { placeStyles } from './placeCss.js';

import '@/components/Header/header.js';
import './navigation.js';
import './placeInfo.js';
import './menu.js';
import './image.js';
import './review.js';

class Place extends LitElement {
  static styles = [commonStyles, placeStyles];

  static properties = {
    userId: { type: String },
    storeInfo: { type: Object },
    active: { type: String },
    _menus: { type: Array },
  };

  constructor() {
    super();
    this._menus = [];
    this.active = 'tab-home';
  }

  firstUpdated() {
    const focusTarget = this.shadowRoot.querySelector('.close-btn');
    focusTarget.focus();
  }

  async connectedCallback() {
    await this._fetchStoreImageData();
    await this._fetchReviewData();
    await this._fetchReviewKeywordData();
    await this._fetchMenuData();

    super.connectedCallback();
  }

  // 업체 이미지 조회
  async _fetchStoreImageData() {
    try {
      const query = `id='${this.storeInfo.id}'`;
      const response = await pb.collection('stores').getFullList({
        // filter: query, // TODO 주석 해제
      });

      // 업체 이미지 정보 세팅
      this.storeImages = this._getImageObjects(response);
    } catch (error) {
      console.error('PocketBase 데이터 알 수 없음', error);
      this.storeImages = [];
    }
  }

  // 리뷰 조회
  async _fetchReviewData() {
    try {
      const query = `store_id='${this.storeInfo.id}'`;
      const response = await pb.collection('reviews').getFullList({
        sort: '-updated',
        // filter: query, // TODO 주석 해제
      });

      // 리뷰 정보 세팅
      this.storeInfo.reviews = response;

      // 방문자 이미지(리뷰에 첨부한 이미지) 정보 세팅
      const images = this._getImageObjects(response);
      this._reviewImages = images;

      response.map;
    } catch (error) {
      console.error('PocketBase 데이터 알 수 없음');
      this.storeInfo.reviews = [];
      this._reviewImages = [];
    }
  }

  // 리뷰 키워드 조회
  async _fetchReviewKeywordData() {
    try {
      const query = `store_id='${this.storeInfo.id}'`;
      const response = await pb.collection('review_keywords').getFullList({
        // filter: query, // TODO 주석 해제
      });

      const keywords = this._countAndSortByKeywordId(response);

      // 키워드 정보 세팅
      this.storeInfo.totalKeywordCount = response.length;
      this.storeInfo.reviewKeywords = keywords;
    } catch (error) {
      console.error('PocketBase 데이터 알 수 없음', error);
      this.storeInfo.totalKeywordCount = 0;
      this.storeInfo.reviewKeywords = [];
    }
  }

  // 각 이미지별로 새로운 객체를 만들어서 반환
  _getImageObjects(arr) {
    return arr.flatMap((item) =>
      item.image.map((image) => ({
        ...item, // item 객체의 나머지 속성들을 그대로 복사
        image: image, // image 속성만 덮어쓰기
      }))
    );
  }

  // keyword_id별 개수 세어서 배열 반환
  _countAndSortByKeywordId(data) {
    // `keyword_id`별로 카운트하는 객체
    const countMap = data.reduce((acc, item) => {
      const { keyword_id, keyword_icon, keyword_image, keyword_name } = item;

      // 기존에 있는 keyword_id가 있으면 카운트를 증가, 없으면 새로운 항목 추가
      const id = item.keyword_id;
      if (acc[keyword_id]) {
        acc[keyword_id].count += 1;
      } else {
        acc[keyword_id] = {
          keyword_icon,
          keyword_id,
          keyword_image,
          keyword_name,
          count: 1,
        };
      }
      return acc;
    }, {});

    // 카운트가 높은 순으로 정렬하여 배열로 반환
    return Object.values(countMap).sort((a, b) => b.count - a.count);
  }

  // 메뉴 정보 조회
  async _fetchMenuData() {
    try {
      const query = `store_id='${this.storeInfo.id}'`;
      const response = await pb.collection('store_menus').getFullList({
        sort: 'index',
        // filter: query, // TODO 주석 해제
      });

      this._menus = response;
    } catch (error) {
      console.error('PocketBase 데이터 알 수 없음');
      this._menus = [];
    }
  }

  // 스크롤 이동
  _scrollToTarget(target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // 닫기 버튼 클릭
  _handleCloseClick(e) {
    this.dispatchEvent(
      new CustomEvent('close-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  // 복사 버튼 클릭
  _handleCopyClick(e) {
    const { data } = e.detail;

    // 텍스트를 클립보드에 복사
    navigator.clipboard
      .writeText(data)
      .then(function () {
        alert('텍스트가 복사되었습니다!');
      })
      .catch(function (err) {
        console.error(err);
        alert('복사 실패했습니다.');
      });
  }

  // 업체 이미지 더보기 버튼 클릭
  _handleStoreImageMoreClick() {
    this._handleMoreClick({ detail: { type: 'image' } });
  }

  // 더보기 버튼 클릭
  _handleMoreClick(e) {
    const { type } = e.detail;
    this.active = `tab-${type}`;
    const target = this.shadowRoot.querySelector('navigation-element');
    this._scrollToTarget(target);
  }

  // 탭 버튼 클릭 시
  _handleActiveChange(e) {
    this.active = e.detail.active;
  }

  // 업체 이미지 미리보기 그리기
  _renderStoreImagePreview() {
    return html`<ul class="store-image-preview">
      ${this.storeImages.slice(0, 2).map(
        (item, index) =>
          html`<li>
            <button class="store-image-more-btn" @click=${this._handleStoreImageMoreClick}>
              <figure>
                <img src="${getPbImageURL(item)}" alt="" />
                <figcaption class="a11y-hidden">업체 이미지</figcaption>
              </figure>
              ${index == 1 && this.storeImages.length > 2
                ? html`<span class="more-image-count">
                    <span class="a11y-hidden">이미지 개수</span>
                    <span>${this.storeImages.length}+</span>
                  </span>`
                : ''}
              <span class="a11y-hidden">업체 이미지 더보기</span>
            </button>
          </li>`
      )}
    </ul>`;
  }

  render() {
    return html`
      <section class="place-section">
        <article class="place-section__top">
          <h3 class="a11y-hidden" aria-hidden="true">장소 상세 정보</h3>
          <button
            @click=${this._handleCloseClick}
            type="button"
            aria-label="닫기"
            class="close-btn"
          >
            <span>${this.storeInfo.place_name}</span>
            <img src="/images/ico_close.svg" alt="" role="presentation" />
          </button>
        </article>

        <article class="place-section__main">
          ${this.storeImages && this.storeImages.length > 0 ? this._renderStoreImagePreview() : ''}

          <div class="place-top">
            <div class="title">
              <strong class="place-name">${this.storeInfo.place_name}</strong>
              <span class="place-category">${this.storeInfo.category_group_name}</span>
            </div>
          </div>

          <navigation-element
            .active=${this.active}
            @active-change=${this._handleActiveChange}
          ></navigation-element>

          <section class="tab-section">
            <article
              class="tab-content ${this.active === 'tab-home' ? 'is--active' : ''}"
              id="panel_home"
              role="tabpanel"
              aria-labelledby="tab_home"
            >
              <h3 class="a11y-hidden">홈 탭</h3>

              <place-info
                .storeInfo=${this.storeInfo}
                @copy-click=${this._handleCopyClick}
              ></place-info>

              ${this._menus && this._menus.length > 0
                ? html`<menu-element
                    .menus=${this._menus.slice(0, 4)}
                    .totalMenuCount=${this._menus.length}
                    .is_preview=${true}
                    @preview-more-click=${this._handleMoreClick}
                  ></menu-element>`
                : ''}
              ${this._reviewImages && this._reviewImages.length > 0
                ? html` <image-element
                    .images=${this._reviewImages.slice(0, 5)}
                    .is_preview=${true}
                    @preview-more-click=${this._handleMoreClick}
                  ></image-element>`
                : ''}
              ${this.storeInfo.reviews && this.storeInfo.reviews.length > 0
                ? html` <review-element
                    .reviews=${this.storeInfo.reviews.slice(0, 5)}
                    .totalReviewCount=${this.storeInfo.reviews.length}
                    .reviewKeywords=${this.storeInfo.reviewKeywords.slice(0, 5)}
                    .totalKeywordCount=${this.storeInfo.totalKeywordCount}
                    .is_preview=${true}
                    @preview-more-click=${this._handleMoreClick}
                  ></review-element>`
                : ''}
            </article>

            <article
              class="tab-content ${this.active === 'tab-menu' ? 'is--active' : ''}"
              id="panel_menu"
              role="tabpanel"
              aria-labelledby="tab_menu"
            >
              <h3 class="a11y-hidden">메뉴 탭</h3>

              <menu-element
                .menus=${this._menus}
                .totalMenuCount=${this._menus.length}
              ></menu-element>
            </article>

            <article
              class="tab-content ${this.active === 'tab-review' ? 'is--active' : ''}"
              id="panel_review"
              role="tabpanel"
              aria-labelledby="tab_review"
            >
              <h3 class="a11y-hidden">리뷰 탭</h3>

              <review-element
                .reviews=${this.storeInfo.reviews}
                .totalReviewCount=${this.storeInfo.reviews.length}
                .reviewKeywords=${this.storeInfo.reviewKeywords}
                .totalKeywordCount=${this.storeInfo.totalKeywordCount}
              ></review-element>
            </article>

            <article
              class="tab-content ${this.active === 'tab-image' ? 'is--active' : ''}"
              id="panel_image"
              role="tabpanel"
              aria-labelledby="tab_image"
            >
              <h3 class="a11y-hidden">사진 탭</h3>

              <image-element
                .images=${[...this.storeImages, ...this._reviewImages]}
              ></image-element>
            </article>
          </section>
        </article>
      </section>
    `;
  }
}

customElements.define('place-element', Place);
