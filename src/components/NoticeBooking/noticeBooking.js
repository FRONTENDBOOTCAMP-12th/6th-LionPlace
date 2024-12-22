import { html, LitElement } from 'lit';
import { NoticeBookingStyle } from './noticeBookingCss';
import resetStyle from '@/styles/reset.js';
import Swal from 'sweetalert2';

class NoticeBooking extends LitElement {
  static properties = {
    isFavorite: { type: Boolean },
    data: { type: Array },
  };

  static styles = [resetStyle, NoticeBookingStyle];

  constructor() {
    super();
    this.isFavorite = false;
  }

  handleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  render() {
    return html`
      <div class="notice-container">
        <!-- 예약 내용 -->
        <section class="notice-booking">
          <h2 class="a11y-hidden">예약된 정보</h2>
          <article class="notice-booking__info">
            <h3 class="a11y-hidden">예약 지점, 날짜, 시간 정보</h3>
            <figure>
              <img src="/public/images/ico_hospital.svg" alt="" role="presentation" />
              <figcaption class="a11y-hidden">병의원</figcaption>
            </figure>
            <article class="notice-booking__text">
              <h4>유디계산치과의원</h4>
              <p>
                <span>22.11.29 화</span>
                <strong>오후 2:00</strong>
              </p>
            </article>
          </article>
          <article class="notice-booking__button">
            <h3 class="a11y-hidden">즐겨찾기, 더보기 버튼 클릭 영역</h3>
            <figure class="favorites">
              <button @click="${this.handleFavorite}" type="button">
                <div class="${this.isFavorite ? 'is--active' : ''}"></div>
              </button>
              <figcaption class="a11y-hidden" aria-hidden="true">즐겨찾기 버튼</figcaption>
            </figure>
            <figure class="more">
              <button type="button">
                <img src="/public/images/ico_more.svg" alt="" />
              </button>
              <figcaption class="a11y-hidden">더보기 버튼</figcaption>
            </figure>
          </article>
        </section>

        <!-- 예약 카드 -->
        <section class="reservation-card">
          <article class="reservation-details">
            <header class="reservation-header">
              <h2>첫 번째 예약</h2>
              <figure>
                <img src="/public/images/img_feed.png" alt="" />
                <figcaption class="a11y-hidden">리뷰 이미지</figcaption>
              </figure>
            </header>
            <div class="review">
              <p class="description">
                뭘 해도 사진에 머리가 안담겨요ㅠㅠ <br />
                진짜 너무 예뻐요 제가 원하던 스타일이에요 감사해요
              </p>
              <div class="feedback">
                <div class="feedback-info">
                  <span class="feedback-icon">💚</span>
                  <span>원하는 스타일로 잘해줘요</span>
                </div>
                <div class="feedback-info">
                  <button class="feedback-btn">+<span class="like-count">2</span></button>
                </div>
              </div>
            </div>
          </article>
          <footer class="reservation-footer">
            <div class="staff-info">
              <span class="manager">심선범 실장님</span>
              <span class="price">35,000원</span>
            </div>
            <div class="type-info">
              <span class="type-role">컷</span>
            </div>
          </footer>
        </section>
      </div>
    `;
  }
}

customElements.define('noticebooking-element', NoticeBooking);
