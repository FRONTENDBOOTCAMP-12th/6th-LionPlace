import { LitElement, html } from 'lit';
import { editProfileFormStyles } from './editProfileFormCss.js';
import commonStyles from '@/styles/common.js';
import pb from '@/api/pocketbase.js';

class EditProfileForm extends LitElement {
  static properties = {
    formData: { type: Object },
    isModalOpen: { type: Boolean },
    errorMessage: { type: String },
  };

  static styles = [commonStyles, editProfileFormStyles];

  constructor() {
    super();
    this.formData = {
      avatar: '',
      introduction: '',
    };
    this.isModalOpen = false;
    this.errorMessage = '';
    this._boundHandleKeyDown = this._handleKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadUserData();
    window.addEventListener('keydown', this._boundHandleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._boundHandleKeyDown);
  }

  _handleKeyDown(e) {
    if (e.key === 'Escape') {
      this._closeAvatarOptions();
    }
  }

  async _loadUserData() {
    try {
      const userId = pb.authStore.model.id;
      const userRecord = await pb.collection('users').getOne(userId);

      const avatarUrl = userRecord.avatar
        ? pb.getFileUrl(userRecord, userRecord.avatar)
        : '/images/profile.png';

      this.formData = {
        ...this.formData,
        avatar: avatarUrl,
        introduction: userRecord.introduction || '',
      };
    } catch (error) {
      console.error('유저 데이터 로딩 실패: ', error);
      this.errorMessage = '유저 데이터 로딩에 실패했습니다.';
    }
  }

  async _selectFile() {
    return new Promise((resolve) => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        resolve(file);
      });

      fileInput.click();
    });
  }

  async _uploadAvatar(file) {
    this.errorMessage = '';
    try {
      const userId = pb.authStore.model.id;
      const formData = new FormData();
      formData.append('avatar', file);

      const updatedRecord = await pb.collection('users').update(userId, formData);
      const newAvatarUrl = pb.getFileUrl(updatedRecord, updatedRecord.avatar);
      this.formData = {
        ...this.formData,
        avatar: newAvatarUrl,
      };
      this.requestUpdate();
    } catch (error) {
      console.error('프로필 사진 업로드 실패: ', error);
      this.errorMessage = '프로필 사진 업로드에 실패했습니다.';
    }
  }

  async _handleAvatarUpload(e) {
    this.errorMessage = '';
    const file = e.target.files[0];
    if (file) this._uploadAvatar(file);
  }

  async _handleAvatarUploadClick() {
    this.errorMessage = '';
    this._closeAvatarOptions();
    const file = await this._selectFile();
    if (file) await this._uploadAvatar(file);
  }

  async _handleAvatarRemove() {
    this.errorMessage = '';
    try {
      const userId = pb.authStore.model.id;
      await pb.collection('users').update(userId, { avatar: null });
      const newAvatarUrl = `/images/profile.png`;
      this.formData = {
        ...this.formData,
        avatar: newAvatarUrl,
      };
      this.requestUpdate();
      this.isModalOpen = false;
    } catch (error) {
      console.error('프로필 사진 제거 실패: ', error);
      this.errorMessage = '프로필 사진 제거에 실패했습니다.';
    }
  }

  async _saveIntroduction() {
    this.errorMessage = '';
    const textarea = this.shadowRoot.querySelector('textarea');
    const introduction = textarea.value.trim();
    if (!introduction) {
      this.errorMessage = '소개를 입력하세요.';
      return;
    }
    try {
      const userId = pb.authStore.model.id;
      await pb.collection('users').update(userId, { introduction });
      this.formData.introduction = introduction;
      window.location.href = '/src/pages/reserved/index.html';
      this.errorMessage = '';
    } catch (error) {
      console.error('소개 저장 실패: ', error);
      this.errorMessage = '소개 저장에 실패했습니다.';
    }
  }

  _showAvatarOptions() {
    this.isModalOpen = true;
    const modalOverlay = this.shadowRoot.querySelector('.modal-overlay');
    if (modalOverlay) {
      modalOverlay.setAttribute('aria-hidden', 'false');
    }
  }

  _closeAvatarOptions() {
    this.isModalOpen = false;
    const focusableElement = this.shadowRoot.querySelector('.avatar-edit-btn');
    const modalOverlay = this.shadowRoot.querySelector('.modal-overlay');
    if (focusableElement) focusableElement.focus();
    if (modalOverlay) {
      modalOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  _renderAvatarOptionsModal() {
    if (!this.isModalOpen) {
      return html``;
    }
    return html`
      <div
        class="modal-overlay"
        @click="${this._closeAvatarOptions}"
        aria-hidden="${this.isModalOpen ? 'false' : 'true'}"
      >
        <div
          class="modal-content"
          @click="${(e) => e.stopPropagation()}"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <h3 id="modal-title">프로필 사진 옵션</h3>
          <button @click="${this._handleAvatarUploadClick}" aria-label="사진 업로드">
            사진 업로드
          </button>
          <button @click="${this._handleAvatarRemove}" aria-label="사진 삭제">사진 삭제</button>
          <button @click="${this._closeAvatarOptions}" aria-label="취소">취소</button>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <main class="profile-container">
        <header class="profile-header">
          <button @click=${() => history.back()} type="button" aria-label="뒤로가기">
            <img src="/images/ico_arrow_left.svg" alt="" role="presentation" />
            <span>프로필 설정</span>
          </button>
        </header>

        <section class="profile-avatar-section">
          <h2 class="a11y-hidden">프로필 사진</h2>
          <div class="avatar-wrapper">
            <img
              src="${this.formData.avatar}"
              alt="사용자 프로필 사진"
              class="avatar-image"
              @click="${this._showAvatarOptions}"
            />
            <button
              class="avatar-edit-btn"
              @click="${this._showAvatarOptions}"
              aria-label="사진 변경"
            >
              <img src="/images/ico_write_sm.svg" alt="" class="edit-icon" />
            </button>
          </div>
        </section>

        <section class="profile-introduction-section">
          <h2 class="section-title">소개</h2>
          <textarea
            id="introduction-textarea"
            placeholder="소개를 작성해주세요"
            class="introduction-textarea"
            .value="${this.formData.introduction}"
            @input="${(e) => (this.formData.introduction = e.target.value)}"
          ></textarea>
          <p
            class="error-message"
            role="alert"
            aria-live="assertive"
            ?hidden="${!this.errorMessage}"
          >
            ${this.errorMessage}
          </p>
          <button class="save-btn" @click="${this._saveIntroduction}">저장</button>
        </section>

        ${this._renderAvatarOptionsModal()}
      </main>
    `;
  }
}

customElements.define('edit-profile-form', EditProfileForm);
