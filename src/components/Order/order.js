import { html, LitElement } from 'lit';
import { orderStyles } from './orderCss';
import resetStyle from '@/styles/reset.js';

class OrderPage extends LitElement {
  static styles = [resetStyle, orderStyles];

  constructor() {
    super();
  }

  render() {
    return html`
      <section class="order-section">
        <article class="order-section__inner">
          <div class="order">
            <h2><strong>&ldquo;네이버 예약&rdquo;</strong> 지금 바로 이용해보세요.</h2>
            <ul class="order-list">
              <li><a href="/" target="_blank" rel="noopener noreferrer">네이버 주문</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">뷔페</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">공방•클래스</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">놀이공원</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">키즈카페</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">아쿠아리움</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">전시</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">공연</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">펜션</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">헤어샵</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">편의점 택배</a></li>
              <li><a href="/" target="_blank" rel="noopener noreferrer">편의점 배달</a></li>
            </ul>
          </div>
          <div class="event">
            <a href="/" target="_blank" rel="noopener noreferrer" class="event-link">
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
