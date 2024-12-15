import { LitElement, html, css } from 'lit';
import pb from '@/api/pocketbase';

class SignUpForm extends LitElement {
  static get properties() {
    return {
      idValue: { type: String },
      pwValue: { type: String },
      pwConfirmValue: { type: String },
      emailValue: { type: String },
      idError: { type: String },
      pwError: { type: String },
      pwConfirmError: { type: String },
      emailError: { type: String },
      isSubmitEnabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.idValue = '';
    this.pwValue = '';
    this.emailValue = '';
    this.pwConfirmValue = '';
    this.idError = '';
    this.pwError = '';
    this.pwConfirmError = '';
    this.emailError = '';
    this.isSubmitEnabled = false;
  }

  static styles = css`
    .container {
      max-width: 30rem;
      margin: 0 auto;
      padding: 4rem;
    }

    .container h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
    }

    .container .logo {
      text-align: center;
      margin-bottom: 3rem;
    }

    .container .logo img {
      width: auto;
      height: 15rem;
    }

    .form-group {
      width: 100%;
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .form-group input {
      box-sizing: border-box;
      width: 100%;
      padding: 1rem;
      border: 1px solid white;
      border-radius: 6px;
      background-color: transparent;
      color: white;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .form-group input::placeholder {
      padding: 0.3rem;
      color: white;
    }

    .form-group .error {
      color: red;
      font-size: 0.875rem;
    }

    .register-form button {
      box-sizing: border-box;
      width: 100%;
      height: 4rem;
      padding: 1rem;
      background-color: white;
      border: none;
      border-radius: 6px;
      color: #1a1f2e;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 4rem;
    }

    .register-form button:disabled {
      background-color: #f0f0f0;
      color: gray;
      cursor: not-allowed;
    }
  `;

  // 회원가입 페이지 배경색, 글자색 변경
  firstUpdated() {
    document.documentElement.style.setProperty('--background-color', '#171f31');
    document.documentElement.style.setProperty('--color', '#fff');
  }

  get idInput() {
    return this.renderRoot.querySelector('#idField');
  }
  get pwInput() {
    return this.renderRoot.querySelector('#pwField');
  }
  get pwConfirmInput() {
    return this.renderRoot.querySelector('#pwConfirmField');
  }
  get emailInput() {
    return this.renderRoot.querySelector('#emailField');
  }

  render() {
    return html`
      <div class="container">
        <div class="logo">
          <img src="/img_logo.svg" alt="Lion Place 로고" />
        </div>

        <h1>회원가입</h1>

        <form class="register-form" @submit="${this.handleSubmit}">
          <div class="form-group">
            <label for="idField">아이디</label>
            <input
              type="text"
              id="idField"
              placeholder="영문 3자 이상"
              @input="${this.handleValidation}"
              aria-required="true"
              aria-describedby="idError"
            />
            ${this.idError
              ? html`<span id="idError" class="error">${this.idError}</span>`
              : ''}
          </div>

          <div class="form-group">
            <label for="emailField">이메일</label>
            <input
              type="email"
              id="emailField"
              placeholder="인증 가능한 이메일 주소"
              @input="${this.handleValidation}"
              aria-required="true"
              aria-describedby="emailError"
            />
            ${this.emailError
              ? html`<span id="emailError" class="error"
                  >${this.emailError}</span
                >`
              : ''}
          </div>

          <div class="form-group">
            <label for="pwField">비밀번호</label>
            <input
              type="password"
              id="pwField"
              placeholder="8문자 이상, 특수 문자 포함"
              @input="${this.handleValidation}"
              aria-required="true"
              aria-describedby="pwError"
            />
            ${this.pwError
              ? html`<span id="pwError" class="error">${this.pwError}</span>`
              : ''}
          </div>

          <div class="form-group">
            <label for="pwConfirmField">비밀번호 확인</label>
            <input
              type="password"
              id="pwConfirmField"
              placeholder="8문자 이상, 특수 문자 포함"
              @input="${this.handleValidation}"
              aria-required="true"
              aria-describedby="pwConfirmError"
            />
            ${this.pwConfirmError
              ? html`<span id="pwConfirmError" class="error"
                  >${this.pwConfirmError}</span
                >`
              : ''}
          </div>

          <button
            type="submit"
            ?disabled="${!this.isSubmitEnabled}"
            aria-disabled="${!this.isSubmitEnabled}"
          >
            회원가입
          </button>
        </form>
      </div>
    `;
  }

  handleValidation(e) {
    const target = e.currentTarget;
    this[target.id.replace('Field', 'Value')] = target.value;

    const errorMessage = {
      idField: 'idError',
      emailField: 'emailError',
      pwField: 'pwError',
      pwConfirmField: 'pwConfirmError',
    };

    if (target.value.trim() === '') {
      this[errorMessage[target.id]] = '';
    } else {
      this.validateField(target.id);
    }
  }

  validateField(fieldId) {
    const idValue = this.idValue;
    const pwValue = this.pwValue;
    const pwConfirmValue = this.pwConfirmValue;
    const emailValue = this.emailValue;

    switch (fieldId) {
      case 'idField':
        if (idValue.length < 3 || !/^[a-zA-Z0-9]+$/.test(idValue)) {
          this.idError = '아이디는 영문 3자 이상이어야 합니다.';
        } else {
          this.idError = '';
        }
        break;

      case 'pwField':
        if (pwValue.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(pwValue)) {
          this.pwError =
            '비밀번호는 8자 이상이어야 하며, 특수 문자를 포함해야 합니다.';
        } else {
          this.pwError = '';
        }
        break;

      case 'pwConfirmField':
        if (pwValue !== pwConfirmValue) {
          this.pwConfirmError = '비밀번호가 일치하지 않습니다.';
        } else {
          this.pwConfirmError = '';
        }
        break;
      case 'emailField':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
          this.emailError = '유효한 이메일 주소를 입력해 주세요.';
        } else {
          this.emailError = '';
        }
        break;
    }
    const errors = [
      this.idError,
      this.pwError,
      this.pwConfirmError,
      this.emailError,
    ];
    const values = [idValue, pwValue, pwConfirmValue, emailValue];

    this.isSubmitEnabled =
      values.every((value) => value.length > 0) &&
      errors.every((error) => !error);
  }

  // 회원가입 유효성 검사
  validateInputs() {
    return (
      !this.idError && !this.pwError && !this.pwConfirmError && !this.emailError
    );
  }

  handleRegister() {
    if (!this.validateInputs()) {
      return;
    }

    // 중복 유저 검사
    pb.collection('users')
      .getFullList({ filter: `userID = "${this.idInput.value}"` })
      .then((users) => {
        if (users.length > 0) {
          alert('이미 존재하는 아이디입니다.');
          return;
        }

        pb.collection('users')
          .create({
            userID: this.idInput.value,
            password: this.pwInput.value,
            passwordConfirm: this.pwConfirmInput.value,
            email: this.emailInput.value,
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

  handleSubmit(e) {
    e.preventDefault();

    const isValid = this.validateInputs();

    if (isValid) {
      this.handleRegister();
    }
  }
}

// customElements.define('sign-up-form', SignUpForm);
