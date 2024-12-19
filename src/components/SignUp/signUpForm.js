import { LitElement, html, css } from 'lit';
import resetStyles from '@/styles/reset.js';
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
    `,
  ];

  // 회원가입 페이지 배경색, 글자색 변경
  firstUpdated() {
    document.documentElement.style.setProperty('--background-color', '#171f31');
    document.documentElement.style.setProperty('--color', '#fff');
  }

  _handleInputChange(e) {
    const { id, value } = e.detail;
    this.formData = { ...this.formData, [id]: value };
    this._validateField(id, value);
    this._updateSubmitButton();
  }

  _validateField(id, value) {
    if (value.trim() === '') {
      this.errors[id] = '';
      return;
    }

    switch (id) {
      case 'id':
        this.errors.id =
          value.length < 3 || !/^[a-zA-Z0-9]+$/.test(value)
            ? '아이디는 영문 3자 이상이어야 하며, 특수문자를 포함할 수 없습니다.'
            : '';
        break;
      case 'email':
        this.errors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? '유효한 이메일 주소를 입력해 주세요.'
          : '';
        break;
      case 'password':
        this.errors.password =
          value.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(value)
            ? '비밀번호는 8자 이상이어야 하며, 특수 문자를 포함해야 합니다.'
            : '';
        break;
      case 'passwordConfirm':
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

  _handleRegister() {
    pb.collection('users')
      .getFullList({ filter: `userID = "${this.formData.id}"` })
      .then((users) => {
        if (users.length > 0) {
          alert('이미 존재하는 아이디입니다.');
          return;
        }

        pb.collection('users')
          .create({
            userID: this.formData.id,
            password: this.formData.password,
            passwordConfirm: this.formData.passwordConfirm,
            email: this.formData.email,
          })
          .then(() => {
            alert('회원가입 완료');
            location.reload();
          })
          .catch(() => {
            alert('잘못된 정보를 입력하였습니다.');
          });
      })
      .catch((error) => {
        console.error(error);
        alert('서버 에러가 발생했습니다.');
      });
  }

  render() {
    return html`
      <div class="container">
        <app-logo></app-logo>

        <h1>회원가입</h1>

        <form class="register-form" @submit="${this._handleSubmit}">
          <form-input
            label="아이디"
            type="text"
            id="id"
            placeholder="영문 3자 이상"
            .value="${this.formData.id}"
            .error="${this.errors.id}"
            @input-change="${this._handleInputChange}"
          ></form-input>

          <form-input
            label="이메일"
            type="email"
            id="email"
            placeholder="인증 가능한 이메일 주소"
            .value="${this.formData.email}"
            .error="${this.errors.email}"
            @input-change="${this._handleInputChange}"
          ></form-input>

          <form-input
            label="비밀번호"
            type="password"
            id="password"
            placeholder="8문자 이상, 특수 문자 포함"
            .value="${this.formData.password}"
            .error="${this.errors.password}"
            @input-change="${this._handleInputChange}"
          ></form-input>

          <form-input
            label="비밀번호 확인"
            type="password"
            id="passwordConfirm"
            placeholder="8문자 이상, 특수 문자 포함"
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
    `;
  }
}

customElements.define('sign-up-form', SignUpForm);
