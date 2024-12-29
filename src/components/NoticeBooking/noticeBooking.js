import { html, LitElement } from 'lit';
import { NoticeBookingStyle } from './noticeBookingCss';
import commonStyles from '@/styles/common.js';
import pb from '@/api/pocketbase';

pb.autoCancellation(false);

class NoticeBooking extends LitElement {
  static properties = {
    data: { type: Array },
  };

  static styles = [commonStyles, NoticeBookingStyle];

  constructor() {
    super();
    this.data = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._fetchData();
  }

  // pocketbase에 transaction_details 데이터 가져오는 함수
  async _fetchData() {
    try {
      const response = await pb.collection('transaction_details').getFullList();
      this.data = response.map((item) => ({
        ...item, // item 객체 모든 필드 복사
        favorites: item.favorites ?? false, // favorites 필드 사용 그 값이 없다면 기본값 false 사용
      }));
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
    }
  }

  // 즐겨찾기 함수
  async handleFavorite(e) {
    const dataIndex = e.target.closest('button').dataset.index;
    const updateData = [...this.data];
    const target = updateData[dataIndex]; // this.data의 data-index 추출

    const favoriteStatus = !target.favorites; // 즐겨찾기 상태 반전하기 위함(토글)

    try {
      // 서버에 상태 업데이트 => target.id에 favorites 필드를 favoriteStatus로 업데이트
      await pb.collection('transaction_details').update(target.id, {
        favorites: favoriteStatus,
      });

      // 로컬 상태 업데이트
      updateData[dataIndex].favorites = favoriteStatus; // 로컬 데이터 해당 favorites 반전된 favoriteStatus로 업데이트
      this.data = updateData; // this.data 갱신된 updateData 배열로 설정
    } catch (error) {
      console.error('즐겨찾기 업데이트 실패', error);
    }
  }

  render() {
    return html`
      <div class="back-container">
        <button @click=${() => history.back()} type="button" aria-label="뒤로가기">
          <img src="/images/ico_arrow_left.svg" alt="" role="presentation" />
          <span>방문한 기록</span>
        </button>
      </div>

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
                  <figcaption class="a11y-hidden">${item.field}</figcaption>
                </figure>
                <div class="notice-booking__text">
                  <h4>${item.store_id}</h4>
                  <p>
                    <span>${item.date}</span>
                    <strong>${item.time}</strong>
                  </p>
                </div>
              </article>
              <article class="notice-booking__button">
                <h3 class="a11y-hidden">즐겨찾기, 더보기 버튼 클릭 영역</h3>
                <figure class="favorites">
                  <button @click="${this.handleFavorite}" type="button" data-index="${index}">
                    <span class="${item.favorites ? 'is--active' : ''}"></span>
                  </button>
                  <figcaption class="a11y-hidden" aria-hidden="true">즐겨찾기 버튼</figcaption>
                </figure>
                <figure class="more">
                  <button type="button">
                    <img src="/images/ico_more.svg" alt="" role="presentation" />
                  </button>
                  <figcaption class="a11y-hidden">더보기 버튼</figcaption>
                </figure>
              </article>
            </section>

            <!-- 예약 카드 -->
            <section class="reservation-card">
              <h2 class="a11y-hidden">방문 기록 카드</h2>
              <article class="reservation-details">
                <div class="reservation-top">
                  <h3 class="a11y-hidden">예약 상세 정보</h3>
                  <p>${item.reserved_count}</p>
                  <figure>
                    <img
                      src="https://lion-place.pockethost.io/api/files/transaction_details/${item.id}/${item.item_image}"
                      alt=""
                      role="presentation"
                    />
                    <figcaption class="a11y-hidden">리뷰 이미지</figcaption>
                  </figure>
                </div>

                <div class="review">
                  <p class="description">
                    ${item.description.split('\n').map((text) => html`<span>${text}</span>`)}
                  </p>
                  <div class="feedback">
                    <div class="feedback-info">
                      <span class="feedback-icon">${item.hashtag_description_icon}</span>
                      <span>${item.hashtag_description}</span>
                    </div>
                    <div class="feedback-info">+<span class="like-count">${item.count}</span></div>
                  </div>
                </div>
              </article>
              <article class="reservation-bottom">
                <h3 class="a11y-hidden">예약 부가 정보</h3>
                <div class="staff-info">
                  <span class="manager">${item.manager}</span>
                  <span class="price">${item.price.toLocaleString()}원</span>
                </div>
                <div class="type-info">
                  <span class="type-role">${item.type_role}</span>
                </div>
              </article>
            </section>
          `
        )}
      </div>
    `;
  }
}

customElements.define('noticebooking-element', NoticeBooking);
