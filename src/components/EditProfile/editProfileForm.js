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
    this._loadUserData();
    this.isModalOpen = false;
    this.errorMessage = '';
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
    }
  }

  async _handleAvatarUpload(e) {
    this.errorMessage = '';
    const file = e.target.files[0];
    if (file) {
      try {
        const userId = pb.authStore.model.id;
        const formData = new FormData();
        formData.append('avatar', file);

        const updatedRecord = await pb.collection('users').update(userId, formData);
        this.formData.avatar = `${pb.getFileUrl(
          updatedRecord,
          updatedRecord.avatar
        )}?t=${Date.now()}`;
      } catch (error) {
        console.error('프로필 사진 업로드 실패: ', error);
        this.errorMessage = '프로필 사진 업로드에 실패했습니다.';
      }
    }
  }

  async _handleAvatarRemove() {
    this.errorMessage = '';
    try {
      const userId = pb.authStore.model.id;
      const updatedRecord = await pb.collection('users').update(userId, { avatar: null });
      this.formData.avatar = `/images/profile.png?t=${Date.now()}`;
    } catch (error) {
      console.error('프로필 사진 제거 실패: ', error);
      this.errorMessage = '프로필 사진 제거에 실패했습니다.';
    }
  }

  async _saveIntroduction() {
    this.errorMessage = '';
    const introduction = this.shadowRoot.querySelector('textarea').value;
    if (!introduction.trim()) {
      this.errorMessage = '소개를 입력하세요.';
      return;
    }
    try {
      const userId = pb.authStore.model.id;
      await pb.collection('users').update(userId, { introduction });
      this.errorMessage = '';
    } catch (error) {
      console.error('소개 저장 실패: ', error);
      this.errorMessage = '소개 저장에 실패했습니다.';
    }
  }

  _showAvatarOptions() {
    this.isModalOpen = true;
  }

  _closeAvatarOptions() {
    this.isModalOpen = false;
    if (this.fileInput) {
      this.fileInput.value = '';
    }
  }

  _handleAvatarUploadClick() {
    this._closeAvatarOptions();
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const userId = pb.authStore.model.id;
          const formData = new FormData();
          formData.append('avatar', file);

          const updatedRecord = await pb.collection('users').update(userId, formData);
          this.formData.avatar = pb.getFileUrl(updatedRecord, updatedRecord.avatar);
        } catch (error) {
          console.error('프로필 사진 업로드 실패: ', error);
          this.errorMessage = '프로필 사진 업로드에 실패했습니다.';
        }
      }
    });

    fileInput.click();
  }

  _renderAvatarOptionsModal() {
    if (!this.isModalOpen) {
      return html``;
    }
    return html`
      <div class="modal-overlay" @click="${this._closeAvatarOptions}">
        <div
          class="modal-content"
          @click="${(e) => e.stopPropagation()}"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <h2 id="modal-title" class="visually-hidden">프로필 사진 옵션</h2>
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
      <main class="container">
        <section class="avatar-section">
          <div class="avatar">
            <img
              src="${this.formData.avatar}"
              alt="사용자 프로필 사진"
              @click="${this._showAvatarOptions}"
            />
            <label class="avatar-upload">
              <img
                src="/images/ico_write_sm.svg"
                alt="사진 변경"
                role="presentation"
                class="edited-img"
                @click="${this._showAvatarOptions}"
              />
            </label>
          </div>
        </section>
        <section class="introduction-section">
          <label for="introduction-textarea" class="introduction-label">소개</label>
          <textarea
            placeholder="소개를 작성해주세요"
            .value="${this.formData.introduction}"
            @input="${(e) => (this.formData.introduction = e.target.value)}"
          ></textarea>
          <button @click="${this._saveIntroduction}">저장</button>
          <span
            class="error-message"
            role="alert"
            aria-live="assertive"
            ?hidden="${!this.errorMessage}"
            >${this.errorMessage}</span
          >
        </section>
        ${this._renderAvatarOptionsModal()}
      </main>
    `;
  }
}

customElements.define('edit-profile-form', EditProfileForm);
