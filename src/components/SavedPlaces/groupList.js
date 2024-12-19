import { LitElement, html, css } from 'lit';

export class GroupList extends LitElement {
  static properties = {
    groups: { type: Array }, // 그룹 리스트
    activeDropdown: { type: String }, // 현재 열린 드롭다운 메뉴 ID
  };

  static styles = css`
    .list-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-bottom: 0.0625rem solid #f0f0f0;
      cursor: pointer;
      position: relative;
    }
    .icon {
      width: 2.5rem;
      height: 2.5rem;
      background-color: #f8f9fa;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.75rem;
    }
    .content {
      flex: 1;
    }
    .title {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }
    .info {
      font-size: 0.875rem;
      color: #8e8e8e;
    }
    .edit-button {
      width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .edit-button img {
      width: 100%;
      height: 100%;
    }
    .dropdown-menu {
      position: absolute;
      top: 3rem;
      right: 1rem;
      background: white;
      border: 0.0625rem solid #ddd;
      border-radius: 0.25rem;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
      z-index: 10;
    }
    .dropdown-item {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: #333;
      cursor: pointer;
      white-space: nowrap;
    }
    .dropdown-item:hover {
      background: #f5f5f5;
    }
    .new-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      cursor: pointer;
      color: #666;
    }
    .header {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  `;

  constructor() {
    super();
    this.groups = []; // 초기 그룹 리스트
    this.activeDropdown = null; // 드롭다운 메뉴 상태
  }

  render() {
    return html`
      ${this.groups.map(
        (group) => html`
          <div class="list-item" @click="${() => this._handleGroupClick(group)}">
            <div class="icon">
              <img src="/images/ico_${group.icon}.svg" alt="${group.title}" />
            </div>
            <div class="content">
              <div class="title">${group.title}</div>
              <div class="info">
                저장된 장소 ${group.places}개
                ${group.isPrivate
                  ? '· 비공개'
                  : `· 팔로워 ${group.followers}명 · 조회 ${group.views}회`}
              </div>
            </div>
            <div class="edit-button" @click="${(e) => this._toggleDropdown(e, group.id)}">
              <img src="/images/ico_dots.svg" alt="편집" />
            </div>
            ${this.activeDropdown === group.id
              ? html`
                  <div class="dropdown-menu">
                    <div class="dropdown-item" @click="${(e) => this._handleEditGroup(e, group)}">
                      수정
                    </div>
                    <div class="dropdown-item" @click="${(e) => this._handleDeleteGroup(e, group)}">
                      삭제
                    </div>
                  </div>
                `
              : ''}
          </div>
        `
      )}
      <div class="new-group" @click="${this._handleNewGroup}">
        <img src="/images/ico_plus.svg" alt="새 리스트" />
        <span>새 리스트 만들기</span>
      </div>
    `;
  }

  _toggleDropdown(e, groupId) {
    e.stopPropagation(); // 이벤트 전파 중단
    this.activeDropdown = this.activeDropdown === groupId ? null : groupId;
    this.requestUpdate();
  }

  _handleGroupClick(group) {
    // 드롭다운이 열려 있을 경우 리스트 클릭 이벤트 무시
    if (this.activeDropdown) {
      this.activeDropdown = null;
      this.requestUpdate();
      return;
    }

    // 리스트 클릭 이벤트
    this.dispatchEvent(
      new CustomEvent('group-select', {
        detail: group,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleEditGroup(e, group) {
    e.stopPropagation();
    this.activeDropdown = null;
    this.dispatchEvent(
      new CustomEvent('group-edit', {
        detail: group,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleDeleteGroup(e, group) {
    e.stopPropagation();
    this.activeDropdown = null;

    // 그룹 삭제
    this.groups = this.groups.filter((g) => g.id !== group.id);

    this.requestUpdate();

    // 삭제 이벤트 디스패치
    this.dispatchEvent(
      new CustomEvent('group-delete', {
        detail: group,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleNewGroup() {
    this.dispatchEvent(
      new CustomEvent('new-group', {
        bubbles: true,
        composed: true,
      })
    );
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._handleWindowClick.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this._handleWindowClick.bind(this));
  }

  _handleWindowClick() {
    this.activeDropdown = null;
    this.requestUpdate();
  }
}

customElements.define('group-list', GroupList);
