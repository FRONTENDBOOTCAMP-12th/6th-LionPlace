import { LitElement, html } from 'lit';
import { groupListStyles } from './groupListCss';

export class GroupList extends LitElement {
  static properties = {
    groups: { type: Array }, // 그룹 리스트
    activeDropdown: { type: String }, // 현재 열린 드롭다운 메뉴 ID
  };

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
