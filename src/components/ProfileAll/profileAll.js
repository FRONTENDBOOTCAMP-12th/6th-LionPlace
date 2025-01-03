import { LitElement, html } from 'lit';
import { profileAllStyles } from './profileAllCss.js';
import commonStyles from '@/styles/common.js';
import pb from '@/api/pocketbase';

class ProfileAll extends LitElement {
  static properties = {
    userId: { type: String },
    pocketData: { type: Array },
    avatarUrl: { type: String },
  };

  static styles = [commonStyles, profileAllStyles];

  constructor() {
    super();
    this.userId = ''; // 초기값 설정
    this.pocketData = { coupons: [], follow: [] };
    this.avatarUrl = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._fetchData();
    await this._fetchRecordCount();
    await this._loadUserAvatar();
  }

  // 로그인 시 로그인 한 유저의 아이디 데이터 가져오는 함수
  async _fetchData() {
    try {
      const response = pb.authStore.model; // 현재 로그인 한 사용자의 정보 객체로 저장
      if (response) {
        this.userId = response.userID; // user collection userID record에 접근
      } else {
        console.error('로그인 된 사용자가 없습니다.');
      }
    } catch (error) {
      console.error('유저 데이터를 가져오는 중 오류가 발생했습니다.', error);
    }
  }

  // 쿠폰함 collection 데이터를 가져오는 함수 (쿠폰함 갯수를 가져오기 위함)
  async _fetchRecordCount() {
    try {
      const couponRecords = await pb.collection('coupons').getFullList();
      const followingRecords = await pb.collection('following').getFullList();
      this.pocketData = {
        coupons: couponRecords,
        follow: followingRecords,
      };
      this.requestUpdate(); // 렌더링 업데이트 요청
    } catch (error) {
      console.error('쿠폰함의 갯수를 가져오는 중 오류가 발생했습니다.', error);
    }
  }

  async _loadUserAvatar() {
    try {
      const userId = pb.authStore.model.id;
      const userRecord = await pb.collection('users').getOne(userId);
      this.avatarUrl = userRecord.avatar
        ? pb.files.getURL(userRecord, userRecord.avatar)
        : '/images/profile.png';
    } catch (error) {
      console.error('유저 프로필 사진 로딩 실패: ', error);
    }
  }

  render() {
    return html`
      <section class="profile">
        <h2 class="a11y-hidden">프로필</h2>
        <div class="profile-container">
          <div class="profile-container__top">
            <div class="avatar">
              <a href="/src/pages/edit-profile/index.html">
                <img src="${this.avatarUrl}" alt="프로필 이미지" class="profile-img" />
                <img src="/images/ico_write_sm.svg" alt="" role="presentation" class="edited-img" />
              </a>
            </div>
            <div class="user-info">
              <p class="nickname">${this.userId}</p>
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
                    <a href="/src/pages/follow/">
                      <span>팔로잉</span>
                      <span>${this.pocketData.follow ? this.pocketData.follow.length : 0}</span>
                    </a>
                  </li>
                  <li>
                    <a href="/src/pages/follow/">
                      <span>팔로워</span>
                      <span>0</span>
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
          <a class="coupon-link" href="/src/pages/coupon/">
            <span class="coupon-text">쿠폰</span>
            <span class="coupon-count"
              >${this.pocketData.coupons ? this.pocketData.coupons.length : 0}</span
            >
          </a>
        </div>
      </section>
    `;
  }
}

customElements.define('profileall-element', ProfileAll);
