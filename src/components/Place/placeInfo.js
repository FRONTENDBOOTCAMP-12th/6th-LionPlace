import { LitElement, html, css } from 'lit';
import commonStyles from '@/styles/common.js';
import { placeInfoStyles } from './placeInfoCss.js';

class PlaceInfo extends LitElement {
  static styles = [commonStyles, placeInfoStyles];

  static properties = {
    storeInfo: { type: Object },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <section class="place-info">
        <h2 class="a11y-hidden">장소 상세 정보</h2>
        <ul>
          ${this.storeInfo.road_address_name
            ? html`<li class="location">
                <img alt="주소" src="/images/ico_map2.svg" width="18px" height="18px" />
                <p>${this.storeInfo.road_address_name}</p>
                <button type="button" class="loacation-more-btn"></button>
              </li>`
            : ''}
          ${this.storeInfo.phone
            ? html`<li class="call">
                <img alt="전화번호" src="/images/ico_call.svg" width="18px" height="18px" />
                <p>${this.storeInfo.phone}</p>
                <button type="button" class="phone-copy-btn">복사</button>
              </li>`
            : ''}
        </ul>
      </section>
    `;
  }
}

customElements.define('place-info', PlaceInfo);
