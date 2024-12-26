import { LitElement, html } from 'lit';
import { signUpFormCss } from './signUpFormCss.js';
import commonStyles from '@/styles/common.js';
import pb from '@/api/pocketbase';
import './formInput.js';
import './submitButton.js';
import './logo.js';

class SignUpForm extends LitElement {
  static properties = {
    formData: { type: Object },
    errors: { type: Object },
    isSubmitEnabled: { type: Boolean },
  };

  constructor() {
    super();
    this.formData = {
      id: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
    this.errors = {
      id: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
    this.isSubmitEnabled = false;
  }

  static styles = [commonStyles, signUpFormCss];

  // 회원가입 페이지 배경색, 글자색 변경
  firstUpdated() {
    document.documentElement.style.setProperty('--background-color', '#171f31');
    document.documentElement.style.setProperty('--color', '#fff');
  }

  _handleInputChange(e) {
    const { id, value } = e.detail;
    this.formData = { ...this.formData, [id.replace('user-', '')]: value };
    this._validateField(id, value);
    this._updateSubmitButton();
  }

  _validateField(id, value) {
    if (value.trim() === '') {
      this.errors = { ...this.errors, [id.replace('user-', '')]: '' };
      return;
    }

    switch (id) {
      case 'user-id':
        this.errors.id =
          value.length < 3 || !/^[a-zA-Z0-9]+$/.test(value)
            ? '아이디는 영문 3자 이상이어야 하며, 특수문자를 포함할 수 없습니다.'
            : '';
        break;
      case 'user-email':
        this.errors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? '유효한 이메일 주소를 입력해 주세요.'
          : '';
        break;
      case 'user-password':
        this.errors.password =
          value.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(value)
            ? '비밀번호는 8자 이상이어야 하며, 특수 문자를 포함해야 합니다.'
            : '';
        break;
      case 'user-passwordConfirm':
        this.errors.passwordConfirm =
          value !== this.formData.password ? '비밀번호가 일치하지 않습니다.' : '';
        break;
    }
    this.requestUpdate();
    this._updateSubmitButton();
  }

  _updateSubmitButton() {
    const allFieldsFilled = Object.values(this.formData).every((value) => value.length > 0);
    const noErrors = Object.values(this.errors).every((error) => error === '');
    this.isSubmitEnabled = allFieldsFilled && noErrors;
    this.requestUpdate();
  }

  _handleSubmit(e) {
    e.preventDefault();
    if (this._validateInputs()) {
      this._handleRegister();
    } else {
      console.log('Form validation failed');
    }
  }

  _validateInputs() {
    return Object.values(this.errors).every((error) => error === '');
  }

  async _handleRegister() {
    let exsitingUser = false;

    try {
      const usersById = await pb.collection('users').getFullList({
        filter: `userID = "${this.formData.id}"`,
      });

      if (usersById.length > 0) {
        alert('이미 존재하는 아이디입니다.');
        exsitingUser = true;
        return;
      }

      if (!exsitingUser) {
        const usersByEmail = await pb.collection('users').getFullList({
          filter: `email = "${this.formData.email}"`,
        });

        if (usersByEmail.length > 0) {
          console.log('이메일 중복 체크 결과:', usersByEmail);
          alert('이미 존재하는 이메일입니다.');
          exsitingUser = true;
          return;
        }
      }

      if (!exsitingUser) {
        await pb.collection('users').create({
          userID: this.formData.id,
          password: this.formData.password,
          passwordConfirm: this.formData.passwordConfirm,
          email: this.formData.email,
        });

        alert('회원가입 완료');
        window.location.href = '/src/pages/login/loginPage.html';
      }
    } catch (error) {
      console.error('에러 발생:', error);
      alert('오류 발생 : ' + error.message);
    }
  }

  render() {
    return html`
      <section>
        <div class="container">
          <app-logo link="/src/pages/login/loginPage.html"></app-logo>

          <h1>회원가입</h1>

          <form class="register-form" @submit="${this._handleSubmit}">
            <form-input
              label="아이디"
              type="text"
              id="user-id"
              placeholder="아이디 (영문 최소 3자)"
              .value="${this.formData.id}"
              .error="${this.errors.id}"
              @input-change="${this._handleInputChange}"
            ></form-input>

            <form-input
              label="이메일"
              type="email"
              id="user-email"
              placeholder="이메일 (example@domain.com)"
              .value="${this.formData.email}"
              .error="${this.errors.email}"
              @input-change="${this._handleInputChange}"
            ></form-input>

            <form-input
              label="비밀번호"
              type="password"
              id="user-password"
              placeholder="비밀번호 (최소 8자, 특수문자 포함)"
              .value="${this.formData.password}"
              .error="${this.errors.password}"
              @input-change="${this._handleInputChange}"
            ></form-input>

            <form-input
              label="비밀번호 확인"
              type="password"
              id="user-passwordConfirm"
              placeholder="비밀번호 (최소 8자, 특수문자 포함)"
              .value="${this.formData.passwordConfirm}"
              .error="${this.errors.passwordConfirm}"
              @input-change="${this._handleInputChange}"
            ></form-input>

            <submit-button
              .disabled="${!this.isSubmitEnabled}"
              text="회원가입"
              @submit-click="${this._handleSubmit}"
            ></submit-button>
          </form>
        </div>
      </section>
    `;
  }
}

customElements.define('sign-up-form', SignUpForm);
