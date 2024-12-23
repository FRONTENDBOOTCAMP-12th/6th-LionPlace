import { html, LitElement } from 'lit';
import { NoticeBookingStyle } from './noticeBookingCss';
import resetStyle from '@/styles/reset.js';
import pb from '@/api/pocketbase';

pb.autoCancellation(false);

class NoticeBooking extends LitElement {
  static properties = {
    data: { type: Array },
  };

  static styles = [resetStyle, NoticeBookingStyle];

  constructor() {
    super();
    this.data = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._fetchData();
  }

  // 데이터 통신
  async _fetchData() {
    try {
      const response = await pb.collection('transaction_details').getFullList();
      this.data = response.map((item) => ({
        ...item,
        favorites: item.favorites ?? false,
      }));
    } catch (error) {
      console.error('PocketBase 데이터 알 수 없음');
    }
  }

  async handleFavorite(index) {
    const updateData = [...this.data];
    const target = updateData[index];

    const favoriteStatus = !target.favorites;

    try {
      // 서버에 상태 업데이트
      await pb.collection('transaction_details').update(target.id, {
        favorites: favoriteStatus,
      });

      // 로컬 상태 업데이트
      updateData[index].favorites = favoriteStatus;
      this.data = updateData;
    } catch (error) {
      console.error('즐겨찾기 업데이트 실패');
    }
  }

  render() {
    return html`
      <div class="notice-container">
        ${this.data.map(
          (item, index) => html`
            <!-- 예약 내용 -->
            <section class="notice-booking">
              <h2 class="a11y-hidden">예약된 정보</h2>
              <article class="notice-booking__info">
                <h3 class="a11y-hidden">예약 지점, 날짜, 시간 정보</h3>
                <figure>
                  <img
                    src="https://lion-place.pockethost.io/api/files/transaction_details/${item.id}/${item.field_img}"
                    alt=""
                    role="presentation"
                  />
                  <figcaption class="a11y-hidden">병의원</figcaption>
                </figure>
                <article class="notice-booking__text">
                  <h4>${item.store_id}</h4>
                  <p>
                    <span>${item.date}</span>
                    <strong>${item.time}</strong>
                  </p>
                </article>
              </article>
              <article class="notice-booking__button">
                <h3 class="a11y-hidden">즐겨찾기, 더보기 버튼 클릭 영역</h3>
                <figure class="favorites">
                  <button @click="${() => this.handleFavorite(index)}" type="button">
                    <div class="${item.favorites ? 'is--active' : ''}"></div>
                  </button>
                  <figcaption class="a11y-hidden" aria-hidden="true">즐겨찾기 버튼</figcaption>
                </figure>
                <figure class="more">
                  <button type="button">
                    <img src="/images/ico_more.svg" alt="" />
                  </button>
                  <figcaption class="a11y-hidden">더보기 버튼</figcaption>
                </figure>
              </article>
            </section>

            <!-- 예약 카드 -->
            <section class="reservation-card">
              <article class="reservation-details">
                <header class="reservation-header">
                  <h2>${item.reserved_count}</h2>
                  <figure>
                    <img
                      src="https://lion-place.pockethost.io/api/files/transaction_details/${item.id}/${item.item_image}"
                      alt=""
                      role="presentation"
                    />
                    <figcaption class="a11y-hidden">리뷰 이미지</figcaption>
                  </figure>
                </header>

                <div class="review">
                  <p class="description">${item.description}</p>
                  <div class="feedback">
                    <div class="feedback-info">
                      <span class="feedback-icon">${item.hashtag_description_icon}</span>
                      <span>${item.hashtag_description}</span>
                    </div>
                    <div class="feedback-info">
                      <button class="feedback-btn">
                        +<span class="like-count">${item.count}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
              <footer class="reservation-footer">
                <div class="staff-info">
                  <span class="manager">${item.manager}</span>
                  <span class="price">${item.price.toLocaleString()}원</span>
                </div>
                <div class="type-info">
                  <span class="type-role">${item.type_role}</span>
                </div>
              </footer>
            </section>
          `
        )}
      </div>
    `;
  }
}

customElements.define('noticebooking-element', NoticeBooking);
