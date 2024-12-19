import { LitElement, html, css } from 'lit';
import './navBar.js';
import './groupList.js';
import './listIcons.js';

export class SavedPlaces extends LitElement {
  static properties = {
    groups: { type: Array },
    selectedGroup: { type: Object },
    places: { type: Array },
    isCreatingGroup: { type: Boolean },
    newGroupName: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      background: white;
      min-height: 100vh;
      padding-bottom: 3.75rem;
    }
    .header {
      padding: 1rem;
      border-bottom: 0.0625rem solid #f0f0f0;
    }
    .title {
      font-size: 1.25rem;
      font-weight: bold;
    }
    .subtitle {
      font-size: 0.875rem;
      color: #666;
      margin-top: 0.25rem;
    }
    .create-group-form {
      padding: 1rem;
      background-color: #f8f9fa;
      border-bottom: 0.0625rem solid #f0f0f0;
    }
    .input-field {
      width: 100%;
      padding: 0.75rem;
      border: 0.0625rem solid #ddd;
      border-radius: 0.5rem;
      margin-bottom: 0.75rem;
      font-size: 1rem;
      box-sizing: border-box;
    }
    .button-group {
      display: flex;
      gap: 0.5rem;
    }
    .button {
      flex: 1;
      padding: 0.75rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s;
    }
    .button:active {
      opacity: 0.8;
    }
    .create-button {
      background-color: #171f31;
      color: white;
    }
    .cancel-button {
      background-color: #f0f0f0;
      color: #666;
    }
    .place-item {
      display: flex;
      padding: 1rem;
      gap: 1rem;
      border-bottom: 0.0625rem solid #f0f0f0;
    }
    .place-image {
      width: 5rem;
      height: 5rem;
      border-radius: 0.5rem;
      background-size: cover;
      background-position: center;
    }
    .place-content {
      flex: 1;
    }
    .place-name {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }
    .place-info {
      font-size: 0.875rem;
      color: #8e8e8e;
    }
    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      cursor: pointer;
      color: #333;
    }
  `;

  constructor() {
    super();
    this.groups = [
      { id: '1', icon: 'star', title: '내 장소', places: 2, isPrivate: true },
      { id: '2', icon: 'heart', title: '좋아요', places: 2, followers: 0, views: 11 },
      { id: '3', icon: 'check', title: '가봐야 할 곳', places: 2, isPrivate: true },
    ];
    this.selectedGroup = null;
    this.places = [];
    this.isCreatingGroup = false;
    this.newGroupName = '';
  }

  render() {
    return html`
      ${this.selectedGroup ? this._renderPlaces() : this._renderGroups()}
      <nav-bar></nav-bar>
    `;
  }

  _renderGroups() {
    return html`
      <div class="header">
        <div class="title">전체 리스트 ${this.groups.length}</div>
      </div>
      ${this.isCreatingGroup ? this._renderCreateGroupForm() : ''}
      <group-list
        .groups="${this.groups}"
        @group-select="${this._handleGroupSelect}"
        @new-group="${this._handleNewGroup}"
      ></group-list>
    `;
  }

  _renderPlaces() {
    return html`
      <div class="back-button" @click="${this._handleBack}">← 리스트로 돌아가기</div>
      <div class="header">
        <div class="title">${this.selectedGroup.title}</div>
        <div class="subtitle">저장된 장소 ${this.places.length}개</div>
      </div>
      ${this.places.map(
        (place) => html`
          <div class="place-item">
            <div class="place-image" style="background-image: url(${place.imageUrl})"></div>
            <div class="place-content">
              <div class="place-name">${place.name}</div>
              <div class="place-info">${place.category}</div>
              <div class="place-info">${place.address}</div>
            </div>
          </div>
        `
      )}
    `;
  }

  _renderCreateGroupForm() {
    return html`
      <div class="create-group-form">
        <input
          type="text"
          class="input-field"
          placeholder="리스트 이름을 입력해주세요"
          .value="${this.newGroupName}"
          @input="${(e) => (this.newGroupName = e.target.value)}"
        />
        <div class="button-group">
          <button class="button create-button" @click="${this._createGroup}">만들기</button>
          <button class="button cancel-button" @click="${this._toggleCreateGroup}">취소</button>
        </div>
      </div>
    `;
  }

  _handleGroupSelect(e) {
    this.selectedGroup = e.detail;
    // 실제 구현에서는 선택된 그룹의 장소 데이터를 불러와야 함
    this.places = [
      {
        name: '멋진 피자가게',
        address: '서울시 강남구 역삼동 123-45',
        category: '이탈리안 레스토랑',
        imageUrl: '/images/pizza-place.jpg',
      },
      {
        name: '행복한 카페',
        address: '서울시 강남구 역삼동 234-56',
        category: '카페',
        imageUrl: '/images/cafe.jpg',
      },
    ];
  }

  _handleNewGroup() {
    this.isCreatingGroup = true;
  }

  _toggleCreateGroup() {
    this.isCreatingGroup = false;
    this.newGroupName = '';
  }

  _createGroup() {
    if (this.newGroupName.trim()) {
      const newId = String(this.groups.length + 1);
      const newGroup = {
        id: newId,
        icon: 'pin',
        title: this.newGroupName,
        places: 0,
        isPrivate: true,
      };

      this.groups = [...this.groups, newGroup];
      this._toggleCreateGroup();
    }
  }

  _handleBack() {
    this.selectedGroup = null;
    this.places = [];
  }
}

customElements.define('saved-places', SavedPlaces);
