import { html, LitElement } from 'lit';
import { categoryStyles } from './categoryCss';
import resetStyle from '@/styles/reset';
import pb from '@/api/pocketbase';

class TabCategory extends LitElement {
  static properties = {
    category: { type: String, state: true },
    isOpen: { type: Boolean },
    data: { type: Array },
  };

  static styles = [resetStyle, categoryStyles];

  constructor() {
    super();
    this.category = 'all'; // all dataset category 상태 유지
    this.isOpen = false; // 토글 컨텐츠 닫혀있는 기본상태 유지
    this.data = {
      // pocketbase 데이터 배열로 기본값 설정
      all: [],
      beauty: [],
      hospital: [],
      performance: [],
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchData();
  }

  // get 통신 함수
  async fetchData() {
    try {
      const response = await pb.collection('transactions').getFullList();
      this.getFetchData(response);
    } catch (error) {
      console.error('PocketBase 데이터 알 수 없음');
    }
  }

  // 설정한 field 필터링 함수
  getFetchData(items) {
    const filterData = {
      all: items,
      beauty: items.filter((item) => item.field === 'beauty'),
      hospital: items.filter((item) => item.field === 'hospital'),
      performance: items.filter((item) => item.field === 'performance'),
    };

    this.data = filterData;
  }

  handleClickTab(e) {
    const target = e.target;
    this.category = target.dataset.category;
  }

  // 토글 함수
  handleToggle() {
    const content = document.querySelector('.content');
    const currentHeight = content.scrollHeight;

    this.isOpen = !this.isOpen; // true 변경

    if (this.isOpen) {
      content.style.height = `${currentHeight}px`;
    } else {
      content.style.height = '0';
    }
  }

  renderData() {
    const data = this.data[this.category];
    const totalReservations = data.reduce((acc, cur) => acc + cur.count, 0);
    const totalCancle = data.reduce((acc, cur) => acc + cur.cancle, 0);
    const totalAmount = data.reduce((acc, cur) => acc + cur.total_price, 0);
    const maxCount = Math.max(...data.map((item) => item.count)); // 최대값 설정
    const userId = [...new Set(data.map((item) => item.user_id))][0] || '알 수 없음'; // Set 중복 제거 후 배열로 전환 후 map

    return html`
      <div class="summary">
        <p>
          <strong>${userId}</strong>님은 <span>${totalReservations}회</span> 예약하셨고,
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
                  <span class="name">${item.store_id}</span>
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

      <div class="btn-container">
        <button @click="${this.handleToggle}" class="more-btn" type="button">
          <span>더보기</span>
          <img
            src="/images/ico_arrow.svg"
            alt="아래방향 화살표"
            class="arrow-img ${this.isOpen ? 'is--active' : ''}"
          />
        </button>
        <section class="content">
          <article class="content-inner">
            <h2 class="a11y-hidden">더보기 컨텐츠</h2>
            <p>
              '함께 성장하는 바른 교육' 이듬&#40;EUID&#41;과 멋쟁이 사자처럼 태킷&#40;Techit&#41;
              스쿨이 만났습니다. '이듬' 교육이 지향하는 비전은 동반 성장에 있습니다. 강사에서
              수강생으로 한 방향으로 흘러가는 지식 전달이 아닌, 함께 공감하고 이해하며 경험하는 교육
              가치를 통해 공동의 혁신을 이끌어내는 것을 목표로 합니다. 멋쟁이 사자처럼 태킷 스쿨은
              '함께'의 가치를 중요하게 생각합니다. 5년이 지나도, 10년이 지나도 IT 업계에 필요한
              인재를 육성하는 교육을 제공하고, 기업의 HRD 파트너로 존재할 것이며 국내 대표 IT 교육
              회사인 만큼 더 좋은 교육이 무엇인지를 끊임없이 고민하는 회사로 자리매김할 것입니다.
            </p>
          </article>
        </section>
      </div>

      <div class="category-bedge">
        <ul>
          <li>
            <button class="category-btn" type="button">
              방문 <strong>${totalReservations}</strong>
            </button>
          </li>
          <li>
            <button class="category-btn" type="button">
              예약취소 <strong>${totalCancle}</strong>
            </button>
          </li>
          <li><button class="category-btn" type="button">기간선택</button></li>
        </ul>
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
              class="performance tab-btn ${this.category === 'performance' ? 'is--active' : ''}"
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
