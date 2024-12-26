import { LitElement, html } from 'lit';
import { footerStyle } from './footerCss';
import resetStyle from '@/styles/reset';

class Footer extends LitElement {
  static styles = [resetStyle, footerStyle];

  constructor() {
    super();
  }

  render() {
    return html`
      <footer>
        <div class="footer__top">
          <div class="global-list">
            <img
              src="/images/ico_global.svg"
              alt="언어 선택 아이콘"
              class="language-icon"
              aria-hidden="true"
            />
            <label for="language" class="a11y-hidden">언어 선택</label>
            <select id="language" name="language">
              <option value="ko" selected>한국어</option>
              <option value="en">영어</option>
            </select>
            <img
              src="/images/ico_select_arrow.svg"
              alt="화살표 아이콘"
              class="select-arrow"
              aria-hidden="true"
            />
          </div>
        </div>
        <div class="footer__bottom">
          <nav class="footer-nav">
            <ul class="footer-nav__top">
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">전체 서비스</a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">로그아웃</a>
              </li>
            </ul>
            <ul class="footer-nav__bottom">
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">라이언 예약 고객센터</a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">이용약관</a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <strong>개인정보처리방침</strong>
                </a>
              </li>
            </ul>
          </nav>
          <p>
            &#40;주&#41; 라이언은 통신판매의 당사자가 아니며, 상품의 정보 및 쿠폰 사용 등과
            관련한의무와 책임은 각 판매자에게 있습니다.
          </p>
          <p>&#40;주&#41; 라이언 사업자정보</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('c-footer', Footer);
