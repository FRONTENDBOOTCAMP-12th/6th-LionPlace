import { LitElement, html, css } from 'lit';
import resetStyles from '@/styles/reset.js';
import pb from '@/api/pocketbase';
import '../SignUp/logo.js';
import '../SignUp/formInput.js';
import '../SignUp/submitButton.js';
import './actionButton.js';

class LoginForm extends LitElement {
  static properties = {
    idValue: { type: String },
    pwValue: { type: String },
  };

  constructor() {
    super();
    this.idValue = '';
    this.pwValue = '';
  }

  static styles = [
    resetStyles,
    css`
      .container {
        max-width: 30rem;
        margin: 0 auto;
        padding: 4rem;
      }

      h1 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 2rem;
        color: white;
      }

      .find {
        display: block;
        margin-top: 1rem;
        color: #fff;
      }
    `,
  ];

  firstUpdated() {
    document.documentElement.style.setProperty('--background-color', '#171f31');
    document.documentElement.style.setProperty('--color', '#fff');
  }

  _goToSignUp() {
    window.location.href = '/src/components/SignUp/index.html';
  }

  async _fetchData() {
    try {
      const id = this.idValue.trim();
      const pw = this.pwValue.trim();

      if (!id || !pw) {
        alert('아이디와 비밀번호를 입력해주세요.');
        return;
      }
      await pb.collection('users').authWithPassword(id, pw);

      const authData = localStorage.getItem('pocketbase_auth');
      const { record, token } = authData ? JSON.parse(authData) : { record: null, token: null };

      localStorage.setItem(
        'auth',
        JSON.stringify({ isAuth: !!record, user: record, token: token })
      );

      alert('로그인 성공');
      location.href = './index.html';
    } catch (error) {
      alert('로그인 실패 ' + error.message);
    }
  }

  _handleInputChange(e) {
    const { detail } = e;

    if (detail.id === 'id') {
      this.idValue = detail.value;
    } else if (detail.id === 'password') {
      this.pwValue = detail.value;
    }
  }

  _handleLogin(e) {
    e.preventDefault();
    this._fetchData();
  }

  render() {
    return html`
      <div class="container">
        <app-logo></app-logo>

        <h1>로그인</h1>

        <form-input
          label="아이디"
          type="text"
          id="id"
          placeholder="아이디를 입력해주세요"
          .value="${this.idValue}"
          @input-change="${this._handleInputChange}"
        ></form-input>
        <form-input
          label="비밀번호"
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          .value="${this.pwValue}"
          @input-change="${this._handleInputChange}"
        ></form-input>

        <a class="find" href="/findId">아이디 찾기</a>
        <a class="find" href="/findPw">비밀번호 찾기</a>

        <submit-button @click=${this._handleLogin} text="로그인"></submit-button>
        <action-button @click=${this._goToSignUp} text="회원가입"></action-button>
      </div>
    `;
  }
}

customElements.define('login-form', LoginForm);
