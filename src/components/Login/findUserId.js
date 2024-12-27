import { LitElement, html } from 'lit';
import { findUserIdCss } from './findUserIdCss.js';
import commonStyles from '@/styles/common.js';
import pb from '@/api/pocketbase.js';
import '../SignUp/logo.js';
import '../SignUp/formInput.js';
import '../SignUp/submitButton.js';

class FindUserId extends LitElement {
  static properties = {
    formData: { type: Object },
    successMessage: { type: String },
  };

  constructor() {
    super();
    this.formData = {
      id: '',
      email: '',
    };
    this.successMessage = '';
  }

  static styles = [commonStyles, findUserIdCss];

  firstUpdated() {
    document.documentElement.style.setProperty('--background-color', '#171f31');
    document.documentElement.style.setProperty('--color', '#fff');
  }

  _handleInputChange(e) {
    const { value } = e.detail;
    this.formData.email = value;
  }

  _validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async handleSubmit() {
    if (!this._validateEmail(this.formData.email)) {
      alert('잘못된 이메일 형식입니다. 올바른 이메일을 입력해 주세요.');
      return;
    }

    try {
      const user = await pb.collection('users').getFirstListItem({
        filter: pb.filter(`email = {:email}`, { email: this.formData.email }),
      });

      console.log(user);

      if (user) {
        this.formData.id = user.userId;
        this.successMessage = `사용자 ID: ${this.formData.id}`;
      } else {
        alert('해당 이메일로 등록된 아이디가 없습니다.');
      }
    } catch (error) {
      console.error('아이디 조회 오류:', error);
      alert('아이디를 찾을 수 없습니다. 다시 시도해 주세요.');
    }

    this.requestUpdate();
  }

  render() {
    return html`
      <section class="find-section">
        <app-logo></app-logo>
        <h1>아이디 찾기</h1>
        <form aria-label="아이디 찾기 양식">
          <form-input
            label="가입 시 등록한 이메일 주소를 입력해주세요"
            type="email"
            id="recover-email"
            placeholder="이메일 (example@domain.com)"
            .value="${this.formData.email}"
            @input-change="${this._handleInputChange}"
          ></form-input>

          <submit-button text="아이디 찾기" @click="${this.handleSubmit}"> </submit-button>
          ${this.successMessage ? html`<p class="success-message">${this.successMessage}</p>` : ''}
        </form>
      </section>
    `;
  }
}

customElements.define('find-user-id', FindUserId);
