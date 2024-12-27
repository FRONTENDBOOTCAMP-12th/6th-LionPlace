import { LitElement, html } from 'lit';
import { savedPlacesStyles } from './savedPlacesCss';

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

  render() {
    return html`
      ${this.selectedGroup ? this._renderPlaces() : this._renderGroups()}
      <nav-bar></nav-bar>
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
        @group-delete="${this._handleGroupDelete}"
      ></group-list>
    `;
  }

  _renderPlaces() {
    return html`
      <div>
        <div class="back-button" @click="${this._handleBack}"><span>&larr;</span> 뒤로가기</div>
        ${this.places.map(
          (place) => html`
            <div class="place-item">
              <div class="place-image" style="background-image: url(${place.imageUrl})"></div>
              <div class="place-content">
                <div class="place-name">${place.name}</div>
                <div class="place-info">
                  ${place.address}<br />
                  ${place.category}
                </div>
              </div>
            </div>
          `
        )}
      </div>
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
