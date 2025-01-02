import { LitElement, html } from 'lit';
import { savedPlacesStyles } from './savedPlacesCss.js';

import commonStyles from '@/styles/common.js';
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

  static styles = [savedPlacesStyles];

  render() {
    return html`
      <main>
        <header>
          <h1>저장된 장소</h1>
        </header>
        ${this.selectedGroup ? this._renderPlaces() : this._renderGroups()}
        <footer>
          <nav-bar></nav-bar>
        </footer>
      </main>
    `;
  }

  _renderCreateGroupForm() {
    return html`
      <div class="create-group-form" aria-labelledby="create-group-title">
        <h2 id="create-group-title">새 그룹 만들기</h2>
        <label for="group-name-input" class="visually-hidden">그룹 이름 입력</label>
        <input
          id="group-name-input"
          type="text"
          class="input-field"
          placeholder="리스트 이름을 입력해주세요"
          .value="${this.newGroupName}"
          @input="${(e) => (this.newGroupName = e.target.value)}"
          aria-required="true"
        />
        <div class="button-group">
          <button
            class="button create-button"
            @click="${this._createGroup}"
            aria-label="그룹 만들기"
          >
            만들기
          </button>
          <button
            class="button cancel-button"
            @click="${this._toggleCreateGroup}"
            aria-label="그룹 만들기 취소"
          >
            취소
          </button>
        </div>
      </div>
    `;
  }

  _renderGroups() {
    return html`
      <section aria-labelledby="groups-title">
        <div class="header">
          <h2 id="groups-title">전체 리스트 (${this.groups.length})</h2>
        </div>
        ${this.isCreatingGroup ? this._renderCreateGroupForm() : ''}
        <group-list
          aria-label="그룹 리스트"
          .groups="${this.groups}"
          @group-select="${this._handleGroupSelect}"
          @new-group="${this._handleNewGroup}"
          @group-delete="${this._handleGroupDelete}"
        ></group-list>
      </section>
    `;
  }

  _renderPlaces() {
    return html`
      <section aria-labelledby="places-title">
        <div class="back-button" @click="${this._handleBack}">
          <a href="#" aria-label="뒤로가기"><span>&larr;</span> 뒤로가기</a>
        </div>
        <h2 id="places-title">${this.selectedGroup.title}의 장소</h2>
        ${this.places.map(
          (place) => html`
            <article class="place-item" aria-labelledby="place-${place.name}">
              <div
                class="place-image"
                style="background-image: url(${place.imageUrl})"
                role="img"
                aria-label="${place.name}의 이미지"
              ></div>
              <div class="place-content">
                <h3 id="place-${place.name}" class="place-name">${place.name}</h3>
                <p class="place-info">
                  ${place.address}<br />
                  ${place.category}
                </p>
              </div>
            </article>
          `
        )}
      </section>
    `;
  }

  _handleGroupDelete(e) {
    const deletedGroup = e.detail; // 삭제된 그룹 정보
    this.groups = this.groups.filter((group) => group.id !== deletedGroup.id); // 그룹 리스트 업데이트
  }

  _handleGroupSelect(e) {
    this.selectedGroup = e.detail;
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
    this.isCreatingGroup = !this.isCreatingGroup;
  }

  _createGroup() {
    if (this.newGroupName.trim()) {
      const newGroup = {
        id: String(this.groups.length + 1),
        icon: 'folder',
        title: this.newGroupName,
        places: 0,
        isPrivate: true,
      };
      this.groups = [...this.groups, newGroup];
      this.newGroupName = '';
      this.isCreatingGroup = false;
    }
  }

  _handleBack() {
    this.selectedGroup = null;
    this.places = [];
  }
}

customElements.define('saved-places', SavedPlaces);
