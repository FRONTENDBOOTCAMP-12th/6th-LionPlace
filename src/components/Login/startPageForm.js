import { LitElement, html } from 'lit';
import { startPageFormCss } from './startPageFormCss.js';
import commonStyles from '../../styles/common.js';
import '../SignUp/logo.js';
import './actionButton.js';

class StartPageForm extends LitElement {
  static styles = [commonStyles, startPageFormCss];

  // 회원가입 페이지 배경색, 글자색 변경
  firstUpdated() {
    document.documentElement.style.setProperty('--background-color', '#171f31');
    document.documentElement.style.setProperty('--color', '#fff');
  }

  goToLoginPage() {
    window.location.href = '/src/pages/login/loginPage.html';
  }

  render() {
    return html`
      <section class="start-section">
        <h1 class="a11y-hidden">시작 페이지</h1>
        <app-logo link="/src/pages/login/loginPage.html"></app-logo>
        <action-button @click="${this.goToLoginPage}" text="시작하기"></action-button>
      </section>
    `;
  }
}
customElements.define('start-page-form', StartPageForm);
