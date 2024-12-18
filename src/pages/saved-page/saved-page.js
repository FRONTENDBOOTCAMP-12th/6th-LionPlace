import { LitElement, html, css } from 'lit';
import '@/components/SavedPlaces/place-list.js';
import '@/components/SavedPlaces/saved-place.js';
import '@/components/SavedPlaces/list-icons.js';

export class SavedPage extends LitElement {
  static properties = {
    lists: { type: Array },
    isCreating: { type: Boolean },
    newListName: { type: String },
    selectedListId: { type: String },
    savedPlaces: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      background-color: white;
    }
    .header {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .tabs {
      display: flex;
      gap: 16px;
      padding: 0 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    .tab {
      padding: 12px 16px;
      cursor: pointer;
      color: #8e8e8e;
      position: relative;
    }
    .tab.active {
      color: #0068c3;
      font-weight: 500;
    }
    .tab.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #0068c3;
    }
    .new-list-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      cursor: pointer;
      color: #666;
    }
    .create-list-form {
      padding: 16px;
      background-color: #f8f9fa;
    }
    .input-field {
      width: 360px;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 12px;
    }
    .button-group {
      display: flex;
      gap: 8px;
    }
    .button {
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
    }
    .create-button {
      background-color: #171f31;
      color: white;
    }
    .cancel-button {
      background-color: #f0f0f0;
    }
    .back-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      cursor: pointer;
      color: #333;
    }
    .list-detail-header {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    .list-detail-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .list-detail-count {
      font-size: 14px;
      color: #666;
    }
  `;

  constructor() {
    super();
    this.lists = [
      { id: '1', icon: 'star', title: '내 장소', places: 2, isPrivate: true },
      { id: '2', icon: 'heart', title: '좋아요', places: 2, followers: 0, views: 11 },
      {
        id: '3',
        icon: 'check',
        title: '가봐야 할 곳',
        places: 2,
        followers: 0,
        views: 0,
        isPrivate: true,
      },
    ];
    this.isCreating = false;
    this.newListName = '';
    this.selectedListId = null;
    this.savedPlaces = {
      1: [
        {
          placeName: '멋진 피자가게',
          address: '서울시 강남구 역삼동 123-45',
          category: '이탈리안 레스토랑',
          imageUrl: '/src/assets/pizza-place.jpg',
        },
        {
          placeName: '행복한 카페',
          address: '서울시 강남구 역삼동 234-56',
          category: '카페',
          imageUrl: '/src/assets/cafe.jpg',
        },
      ],
      2: [
        {
          placeName: '맛있는 라멘집',
          address: '서울시 마포구 서교동 345-67',
          category: '일식당',
          imageUrl: '/src/assets/ramen.jpg',
        },
        {
          placeName: '도심 속 정원',
          address: '서울시 중구 을지로 456-78',
          category: '공원',
          imageUrl: '/src/assets/garden.jpg',
        },
      ],
    };
  }

  render() {
    if (this.selectedListId) {
      return this._renderListDetail();
    }
    return this._renderListOverview();
  }

  _renderListOverview() {
    return html`
      <div class="header">
        <div class="title">전체 리스트 ${this.lists.length}</div>
      </div>

      ${this.isCreating ? this._renderCreateForm() : ''}
      ${this.lists.map(
        (list) => html`
          <place-list
            .id="${list.id}"
            .icon="${list.icon}"
            .title="${list.title}"
            .places="${list.places}"
            .followers="${list.followers}"
            .views="${list.views}"
            .isPrivate="${list.isPrivate}"
            @list-click="${this._handleListClick}"
          ></place-list>
        `
      )}
      <div class="new-list-button" @click="${this._toggleCreateForm}">
        <img src="/src/assets/plus.svg" />
        <span>새 리스트 만들기</span>
      </div>
    `;
  }

  _renderListDetail() {
    const selectedList = this.lists.find((list) => list.id === this.selectedListId);
    const places = this.savedPlaces[this.selectedListId] || [];
    return html`
      <div class="back-button" @click="${this._handleBack}">← 리스트로 돌아가기</div>
      <div class="list-detail-header">
        <div class="list-detail-title">${selectedList.title}</div>
        <div class="list-detail-count">저장된 장소 ${places.length}개</div>
      </div>
      ${places.map(
        (place) => html`
          <saved-place
            .placeName="${place.placeName}"
            .address="${place.address}"
            .category="${place.category}"
            .imageUrl="${place.imageUrl}"
          ></saved-place>
        `
      )}
    `;
  }

  _renderCreateForm() {
    return html`
      <div class="create-list-form">
        <input
          type="text"
          class="input-field"
          placeholder="리스트 이름"
          .value="${this.newListName}"
          @input="${(e) => (this.newListName = e.target.value)}"
        />
        <div class="button-group">
          <button class="button create-button" @click="${this._createList}">만들기</button>
          <button class="button cancel-button" @click="${this._toggleCreateForm}">취소</button>
        </div>
      </div>
    `;
  }

  _handleListClick(e) {
    this.selectedListId = e.detail.id;
  }

  _handleBack() {
    this.selectedListId = null;
  }

  _toggleCreateForm() {
    this.isCreating = !this.isCreating;
    this.newListName = '';
  }

  _createList() {
    if (this.newListName.trim()) {
      const newId = String(this.lists.length + 1);
      this.lists = [
        ...this.lists,
        {
          id: newId,
          icon: 'pin',
          title: this.newListName,
          places: 0,
          followers: 0,
          views: 0,
          isPrivate: true,
        },
      ];
      this.savedPlaces = {
        ...this.savedPlaces,
        [newId]: [],
      };
      this._toggleCreateForm();
    }
  }
}

customElements.define('saved-page', SavedPage);
