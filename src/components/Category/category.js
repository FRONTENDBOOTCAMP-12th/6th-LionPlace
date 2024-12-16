import { html, LitElement } from 'lit';
import { categoryStyles } from './categoryCss';
import resetStyle from '@/styles/reset';

class TabCategory extends LitElement {
  static properties = {
    userData: { type: Object },
    category: { type: String, state: true },
    pricePerReservation: { type: Number },
    dummyData: { type: Object },
  };

  static styles = [resetStyle, categoryStyles];

  constructor() {
    super();
    this.category = 'all';
    this.userData = { id: 'Lion' };
    this.pricePerReservation = 5000;
    this.dummyData = {
      all: [
        { name: '미랑컬헤어 상동점', count: 12 },
        { name: '리움미술관', count: 8 },
        { name: '미랑컬헤어 상동점', count: 4 },
        { name: '범이 빛나는 밤에 사가정점', count: 10 },
        { name: '범이 빛나는 밤에 명동점', count: 4 },
      ],
      beauty: [
        { name: '미랑컬헤어 상동점', count: 12 },
        { name: '미랑컬헤어 상동점', count: 4 },
      ],
      hospital: [{ name: '리움미술관', count: 8 }],
      performance: [
        { name: '범이 빛나는 밤에 사가정점', count: 10 },
        { name: '범이 빛나는 밤에 명동점', count: 4 },
      ],
    };
  }

  handleClickTab(e) {
    const target = e.target;
    this.category = target.dataset.category;
  }

  renderData() {
    const data = this.dummyData[this.category] || [];
    const totalReservations = data.reduce((acc, cur) => acc + cur.count, 0);
    const totalAmount = totalReservations * this.pricePerReservation;
    const maxCount = Math.max(...data.map((item) => item.count));

    return html`
      <div class="summary">
        <p>
          <strong>${this.userData.id}</strong>님은 <span>${totalReservations}회</span> 예약하셨고,
          <span>${totalAmount.toLocaleString()}원</span> 결제하셨어요.
        </p>
      </div>

      <div class="data-container">
        ${data.map(
          (item, index) => html`
            <div class="data-item">
              <div class="data-item__wrap">
                <div class="data-item__inner">
                  <span class="rank">${index + 1}</span>
                  <span class="name">${item.name}</span>
                </div>
                <span class="count">${item.count}회</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width:${(item.count / maxCount) * 100}%"></div>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  render() {
    return html`
      <nav class="category-tab">
        <ul>
          <li>
            <button
              @click="${this.handleClickTab}"
              type="button"
              class="entire tab-btn ${this.category === 'all' ? 'is--active' : ''}"
              data-category="all"
            >
              전체
            </button>
          </li>
          <li>
            <button
              @click="${this.handleClickTab}"
              type="button"
              class="beauty tab-btn ${this.category === 'beauty' ? 'is--active' : ''}"
              data-category="beauty"
            >
              뷰티
            </button>
          </li>
          <li>
            <button
              @click="${this.handleClickTab}"
              type="button"
              class="hospital tab-btn ${this.category === 'hospital' ? 'is--active' : ''}"
              data-category="hospital"
            >
              병의원
            </button>
          </li>
          <li>
            <button
              @click="${this.handleClickTab}"
              type="button"
              class="performance tab-btn ${this.acitveTab === 'performance' ? 'is--active' : ''}"
              data-category="performance"
            >
              공연
            </button>
          </li>
        </ul>
      </nav>

      ${this.renderData()}
    `;
  }
}

customElements.define('category-tab', TabCategory);
