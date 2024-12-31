import { LitElement, html, css } from 'lit';
import commonStyles from '@/styles/common.js';
import { placeStyles } from './placeCss.js';
import pb from '@/api/pocketbase';

import '@/components/Header/header.js';
import './navigation.js';
import './placeInfo.js';
import './menuPreview.js';
import './imagePreview.js';

class Place extends LitElement {
  static styles = [commonStyles, placeStyles];

  static properties = {
    storeInfo: { type: Object },
    _menus: { type: Array },
  };

  constructor() {
    super();
    this._menus = [];
  }

  firstUpdated() {
    // 임시 TODO 삭제
    console.log('firstUpdated() - this.storeInfo', this.storeInfo);
    this.storeInfo.score = 4.3;
    this.storeInfo.reviewCount = 23;
  }

  async connectedCallback() {
    super.connectedCallback();

    await this._fetchMenuData();
  }

  // 메뉴 정보 조회
  async _fetchMenuData() {
    try {
      // 임시 TODO 삭제
      let query = `store_id='${this.storeInfo.id}'`;
      query = `store_id='${815670814}'`;

      const response = await pb.collection('store_menus').getFullList({
        sort: 'index',
        filter: query,
      });

      this._menus = response;
    } catch (error) {
      console.error('PocketBase 데이터 알 수 없음');
    } finally {
      // TODO
      // this.loading = false;
    }
  }

  render() {
    return html`
      <div class="place-container">
        <header-element .placeName="${this.storeInfo.place_name}"></header-element>

        <section class="main">
          <div class="place-image">
            <figure>
              <img
                src="https://lion-place.pockethost.io/api/files/pbc_4273634722/hw25m12j14y10r4/menu1_md8ql3737k.jpg"
                alt="가게 이미지"
              />
              <figcaption class="a11y-hidden">가게 이미지</figcaption>
            </figure>
            <figure>
              <img
                src="https://lion-place.pockethost.io/api/files/pbc_4273634722/98nzba4z7dv20nd/menu4_3uqoqtih10.jpg"
                alt="가게 이미지"
              />
              <figcaption class="a11y-hidden">가게 이미지</figcaption>
            </figure>
          </div>

          <div class="place-top">
            <div class="title">
              <strong class="place-name">${this.storeInfo.place_name}</strong>
              <span class="place-category">${this.storeInfo.category_group_name}</span>
            </div>
            <div class="review-record">
              <div class="review-score">
                <img
                  class="icon-heart"
                  alt="좋아요 평점"
                  src="/images/ico_heart.svg"
                  width="18px"
                  height="18px"
                />
                <p>
                  <span class="rating-score">${this.storeInfo.score}</span>
                  <span class="rating-max">/5</span>
                </p>
              </div>
              <div class="review-count">리뷰 ${this.storeInfo.reviewCount}</div>
            </div>
          </div>

          <navigation-element></navigation-element>

          <section class="tab-contents">
            <div class="noticeContainer">
              <div class="notice">
                <i class="i">
                  <span>이벤트,혜택 </span>
                  <span class="span">알림을 받아보세요!</span>
                </i>
                <div class="alarmsetting">
                  <img class="iconring" alt="" src="/images/ico_ring2.svg" />
                  <i class="i">알림받기</i>
                </div>
              </div>
              <div class="coupon">
                <img class="image-icon" alt="" src="image.png" />
                <div class="textbox">
                  <i class="title">영수증 리뷰 올리고 음료수 먹자!</i>
                  <div class="content">2023.02.02</div>
                  <div class="text">text</div>
                </div>
              </div>
            </div>

            <place-info .storeInfo=${this.storeInfo}></place-info>

            ${this._menus && this._menus.length > 0
              ? html`<menu-preview
                  .menus=${this._menus.slice(0, 4)}
                  .totalMenuCount=${this._menus.length}
                ></menu-preview>`
              : ''}

            <image-preview></image-preview>
          </section>
        </section>
      </div>
    `;
  }
}

customElements.define('place-element', Place);
