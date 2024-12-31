import { html, LitElement } from 'lit';
import { orderStyles } from './orderCss';
import commonStyles from '@/styles/common.js';

class OrderPage extends LitElement {
  static styles = [commonStyles, orderStyles];

  constructor() {
    super();
  }

  render() {
    return html`
      <section class="order-section">
        <h2 class="a11y-hidden">주문탭 영역</h2>
        <article class="order-section__inner">
          <h3 class="a11y-hidden">예약 목록 영역</h3>
          <div class="order">
            <h3><strong>&ldquo;라이온 예약&rdquo;</strong> 지금 바로 이용해보세요.</h3>
            <table class="order-list">
              <caption class="a11y-hidden">
                예약 목록표
              </caption>
              <thead>
                <tr>
                  <td id="order"><a href="/">라이온 주문</a></td>
                  <td id="buffet"><a href="/">뷔페</a></td>
                  <td id="class"><a href="/">공방•클래스</a></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id="park"><a href="/">놀이공원</a></td>
                  <td id="kidCafe"><a href="/">키즈카페</a></td>
                  <td id="aquarium"><a href="/">아쿠아리움</a></td>
                </tr>
                <tr>
                  <td id="display"><a href="/">전시</a></td>
                  <td id="performance"><a href="/">공연</a></td>
                  <td id="pension"><a href="/">펜션</a></td>
                </tr>
                <tr>
                  <td id="hairShop"><a href="/">헤어샵</a></td>
                  <td id="storeParcel"><a href="/">편의점 택배</a></td>
                  <td id="storeDelivery"><a href="/">편의점 배달</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="event">
            <a href="/" class="event-link">
              <span class="event-text">
                <span>도심 속 온천스파!</span>
                <strong>웅진플레이도시</strong>
                <span>3월 22일 호우7시</span>
              </span>
              <figure class="event-img">
                <img src="/images/event_img.svg" alt="" role="presentation" />
                <figcaption class="a11y-hidden">웅진플레이도시 이벤트 배너</figcaption>
              </figure>
            </a>
          </div>
        </article>
        <article class="get-news">
          <h3 class="a11y-hidden">예약 소식 받기 영역</h3>
          <p>예약/주문 스마트봇</p>
          <button type="button">예약 소식 받기</button>
        </article>
      </section>
    `;
  }
}

customElements.define('order-page', OrderPage);
