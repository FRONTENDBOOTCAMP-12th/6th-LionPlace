import { LitElement, html } from 'lit';
import { profileAllStyles } from './profileAllCss';
import resetStyles from '@/styles/reset.js';

class ProfileAll extends LitElement {
  static properties = {
    userId: { type: Object },
  };

  constructor() {
    super();
    this.userId = {
      name: '멋쟁이사자',
    };
  }

  static styles = [resetStyles, profileAllStyles];

  render() {
    return html`
      <section class="profile">
        <h2 class="a11y-hidden">프로필</h2>
        <div class="profile-container">
          <div class="profile-container__top">
            <div class="avatar">
              <button type="button">img</button>
              <img src="/images/ico_write_sm.png" alt="프로필 수정 이미지" />
            </div>
            <div class="user-info">
              <p class="nickname">${this.userId.name}</p>
              <div class="review">
                <ul>
                  <li>
                    <a href="/">
                      <span>리뷰</span>
                      <span>17</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span>사진</span>
                      <span>19</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span>팔로잉</span>
                      <span>0</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span>팔로워</span>
                      <span>2</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="profile-container__bottom">
            <a href="/">피드작성</a>
            <a href="/">리뷰작성</a>
          </div>
        </div>
        <div class="coupon">
          <a href="/" class="coupon-link">
            <span class="coupon-text">쿠폰</span>
            <span class="coupon-count">1</span>
          </a>
        </div>
      </section>
    `;
  }
}

customElements.define('profileall-element', ProfileAll);
