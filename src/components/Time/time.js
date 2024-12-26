import { html, LitElement } from 'lit';
import { timeStyles } from './timeCss.js';
import commonStyles from '@/styles/common.js';

class Time extends LitElement {
  static styles = [commonStyles, timeStyles];

  render() {
    return html`
      <div class="time-wrap">
        <div class="time-wrap__left">
          <p>3:28</p>
          <img src="/images/ico_position.svg" alt="좌표" />
        </div>
        <div class="time-wrap__right">
          <img src="/images/ico_network.svg" alt="네트워크바" />
          <p>lte</p>
          <img src="/images/ico_battery.svg" alt="배터리" />
        </div>
      </div>
    `;
  }
}

customElements.define('time-element', Time);
