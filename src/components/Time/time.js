import { html, LitElement } from 'lit';
import { timeStyles } from './timeCss.js';
import commonStyles from '@/styles/common.js';

class Time extends LitElement {
  static styles = [commonStyles, timeStyles];

  render() {
    return html`
      <section class="time-wrap">
        <h2 class="a11y-hidden">상단 고정 time바</h2>
        <article class="time-wrap__left">
          <h3 class="a11y-hidden">시간 영역</h3>
          <p>3:28</p>
          <img src="/images/ico_position.svg" alt="좌표" />
        </article>
        <article class="time-wrap__right">
          <h3 class="a11y-hidden">네트워크, 배터리 표시 영역</h3>
          <img src="/images/ico_network.svg" alt="네트워크바" />
          <p>lte</p>
          <img src="/images/ico_battery.svg" alt="배터리" />
        </article>
      </section>
    `;
  }
}

customElements.define('time-element', Time);
