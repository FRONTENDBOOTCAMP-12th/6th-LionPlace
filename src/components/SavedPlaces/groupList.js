import { LitElement, html, css } from 'lit';

export class GroupList extends LitElement {
  static properties = {
    groups: { type: Array },
  };

  static styles = css`
    .list-item {
      display: flex;
      padding: 1rem;
      border-bottom: 0.0625rem solid #f0f0f0;
      cursor: pointer;
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
    .new-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      cursor: pointer;
      color: #666;
    }
  `;

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
          </div>
        `
      )}
      <div class="new-group" @click="${this._handleNewGroup}">
        <img src="/images/ico_plus.svg" alt="새 리스트" />
        <span>새 리스트 만들기</span>
      </div>
    `;
  }

  _handleGroupClick(group) {
    this.dispatchEvent(
      new CustomEvent('group-select', {
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
}

customElements.define('group-list', GroupList);
