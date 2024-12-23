import { LitElement, html, css } from 'lit';
import resetStyles from '../../styles/reset.js';
import '../SignUp/logo.js';
import './actionButton.js';

class StartPageForm extends LitElement {
  static styles = [
    resetStyles,
    css`
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
        clip: rect(0, 0, 0, 0);
        overflow: hidden;
      }

      .start-section {
        max-width: 30rem;
        margin: 0 auto;
        padding: 2rem;
        margin-top: 2rem;
      }

      app-logo {
        display: block;
        margin-bottom: 20.5rem;
      }

      action-button {
        display: block;
      }
    `,
  ];

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
        <h1 class="sr-only">시작 페이지</h1>
        <app-logo link="/src/pages/login/loginPage.html"></app-logo>
        <action-button @click="${this.goToLoginPage}" text="시작하기"></action-button>
      </section>
    `;
  }
}
customElements.define('start-page-form', StartPageForm);
