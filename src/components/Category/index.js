import '@/components/Time/time';
import '@/components/ProfileAll/profileAll';
import '@/components/Navigation/navigation';
import '@/components/Tab/tab';
import '@/components/Tab/customElement';
import '@/components/Category/category';

// import { html, LitElement } from 'lit';
// import { categoryStyles } from './categoryCss';
// import resetStyle from '@/styles/reset';
// import pb from '@/api/pocketbase';

// class TabCategory extends LitElement {
//   static properties = {
//     userData: { type: Object },
//     category: { type: String, state: true },
//     isOpen: { type: Boolean },
//     data: { type: Array },
//   };

//   static styles = [resetStyle, categoryStyles];

//   constructor() {
//     super();
//     this.category = 'all';
//     this.userData = { id: 'Lion' };
//     this.isOpen = false;
//     this.data = {
//       all: [],
//       beauty: [],
//       hospital: [],
//       performance: [],
//     };
//   }

//   async connectedCallback() {
//     super.connectedCallback();
//     await this.fetchData();
//   }

//   async fetchData() {
//     try {
//       const response = await pb.collection('transactions').getFullList();
//       this.processFetchedData(response);
//     } catch (error) {
//       console.error('PocketBase 데이터 가져오기 오류:', error.message);
//     }
//   }

//   processFetchedData(items) {
//     const filteredData = {
//       all: items,
//       beauty: items.filter((item) => item.field === 'beauty'),
//       hospital: items.filter((item) => item.field === 'hospital'),
//       performance: items.filter((item) => item.field === 'performance'),
//     };

//     this.data = filteredData; // 상태 업데이트
//   }

//   handleClickTab(e) {
//     const target = e.target;
//     target.focus();
//     this.category = target.dataset.category;
//   }

//   handleToggle() {
//     const content = this.shadowRoot.querySelector('.content');
//     const currentHeight = content.scrollHeight;

//     this.isOpen = !this.isOpen; // true 변경

//     if (this.isOpen) {
//       content.style.height = `${currentHeight}px`;
//     } else {
//       content.style.height = '0';
//     }
//   }

//   renderData() {
//     const data = this.data[this.category] || [];
//     const totalReservations = data.reduce((acc, cur) => acc + cur.count, 0);
//     const totalCancle = data.reduce((acc, cur) => acc + cur.cancle, 0);
//     const totalAmount = data.reduce((acc, cur) => acc + cur.total_price, 0);
//     const maxCount = Math.max(...data.map((item) => item.count));

//     return html`
//       <div class="summary">
//         <p>
//           <strong>${this.userData.id}</strong>님은 <span>${totalReservations}회</span> 예약하셨고,
//           <span>${totalAmount.toLocaleString()}원</span> 결제하셨어요.
//         </p>
//       </div>

//       <div class="data-container">
//         ${data.map(
//           (item, index) => html`
//             <div class="data-item">
//               <div class="data-item__wrap">
//                 <div class="data-item__inner">
//                   <span class="rank">${index + 1}</span>
//                   <span class="name">${item.store_id}</span>
//                 </div>
//                 <span class="count">${item.count}회</span>
//               </div>
//               <div class="progress-bar">
//                 <div class="progress-fill" style="width:${(item.count / maxCount) * 100}%"></div>
//               </div>
//             </div>
//           `
//         )}
//       </div>

//       <div class="btn-container">
//         <button @click="${this.handleToggle}" class="more-btn" type="button">
//           <span>더보기</span>
//           <img
//             src="/images/ico_arrow.svg"
//             alt="아래방향 화살표"
//             class="arrow-img ${this.isOpen ? 'is--active' : ''}"
//           />
//         </button>
//         <section class="content">
//           <article class="content-inner">
//             <h2 class="a11y-hidden">더보기 컨텐츠</h2>
//             <p>
//               '함께 성장하는 바른 교육' 이듬(EUID)과 멋쟁이 사자처럼 태킷(Techit) 스쿨이 만났습니다.
//               '이듬' 교육이 지향하는 비전은 동반 성장에 있습니다. 강사에서 수강생으로 한 방향으로
//               흘러가는 지식 전달이 아닌, 함께 공감하고 이해하며 경험하는 교육 가치를 통해 공동의
//               혁신을 이끌어내는 것을 목표로 합니다. 멋쟁이 사자처럼 태킷 스쿨은 '함께'의 가치를
//               중요하게 생각합니다. 5년이 지나도, 10년이 지나도 IT 업계에 필요한 인재를 육성하는
//               교육을 제공하고, 기업의 HRD 파트너로 존재할 것이며 국내 대표 IT 교육 회사인 만큼 더
//               좋은 교육이 무엇인지를 끊임없이 고민하는 회사로 자리매김할 것입니다.
//             </p>
//           </article>
//         </section>
//       </div>

//       <div class="category-bedge">
//         <ul>
//           <li>
//             <button class="category-btn" type="button">
//               방문 <strong>${totalReservations}</strong>
//             </button>
//           </li>
//           <li>
//             <button class="category-btn" type="button">
//               예약취소 <strong>${totalCancle}</strong>
//             </button>
//           </li>
//           <li><button class="category-btn" type="button">기간선택</button></li>
//         </ul>
//       </div>
//     `;
//   }

//   render() {
//     return html`
//       <nav class="category-tab">
//         <ul>
//           <li>
//             <button
//               @click="${this.handleClickTab}"
//               type="button"
//               class="entire tab-btn ${this.category === 'all' ? 'is--active' : ''}"
//               data-category="all"
//             >
//               전체
//             </button>
//           </li>
//           <li>
//             <button
//               @click="${this.handleClickTab}"
//               type="button"
//               class="beauty tab-btn ${this.category === 'beauty' ? 'is--active' : ''}"
//               data-category="beauty"
//             >
//               뷰티
//             </button>
//           </li>
//           <li>
//             <button
//               @click="${this.handleClickTab}"
//               type="button"
//               class="hospital tab-btn ${this.category === 'hospital' ? 'is--active' : ''}"
//               data-category="hospital"
//             >
//               병의원
//             </button>
//           </li>
//           <li>
//             <button
//               @click="${this.handleClickTab}"
//               type="button"
//               class="performance tab-btn ${this.category === 'performance' ? 'is--active' : ''}"
//               data-category="performance"
//             >
//               공연
//             </button>
//           </li>
//         </ul>
//       </nav>

//       ${this.renderData()}
//     `;
//   }
// }

// customElements.define('category-tab', TabCategory);

//  -------------------------------------------------------
// import { html, LitElement } from 'lit';
// import { categoryStyles } from './categoryCss';
// import resetStyle from '@/styles/reset';

// class TabCategory extends LitElement {
//   static properties = {
//     userData: { type: Object },
//     category: { type: String, state: true },
//     pricePerReservation: { type: Number },
//     dummyData: { type: Object },
//     isOpen: { type: Boolean },
//   };

//   static styles = [resetStyle, categoryStyles];

//   constructor() {
//     super();
//     this.category = 'all';
//     this.userData = { id: 'Lion' };
//     this.pricePerReservation = 5000;
//     this.isOpen = false;
//     this.dummyData = {
//       all: [
//         { name: '범승철 헤어 잠실점', count: 12, cancle: 4 },
//         { name: '범승철 헤어 상동점', count: 4, cancle: 2 },
//         { name: '범승철 헤어 양주점', count: 8, cancle: 5 },
//         { name: '범세브란스 대학병원', count: 8, cancle: 0 },
//         { name: '데레사카톨릭 대학병원', count: 5, cancle: 2 },
//         { name: '야무 대학병원', count: 6, cancle: 2 },
//         { name: '범이 빛나는 밤에 사가정점', count: 7, cancle: 1 },
//         { name: '범이 빛나는 밤에 명동점', count: 4, cancle: 2 },
//         { name: '범이 빛나는 밤에 혜화점', count: 6, cancle: 3 },
//       ],
//       beauty: [
//         { name: '범승철 헤어 잠실점', count: 12, cancle: 4 },
//         { name: '범승철 헤어 상동점', count: 4, cancle: 2 },
//         { name: '범승철 헤어 양주점', count: 8, cancle: 5 },
//       ],
//       hospital: [
//         { name: '범세브란스 대학병원', count: 8, cancle: 0 },
//         { name: '데레사카톨릭 대학병원', count: 5, cancle: 2 },
//         { name: '야무 대학병원', count: 6, cancle: 2 },
//       ],
//       performance: [
//         { name: '범이 빛나는 밤에 사가정점', count: 7, cancle: 1 },
//         { name: '범이 빛나는 밤에 명동점', count: 4, cancle: 2 },
//         { name: '범이 빛나는 밤에 혜화점', count: 6, cancle: 3 },
//       ],
//     };
//   }

//   handleClickTab(e) {
//     const target = e.target;
//     this.category = target.dataset.category;
//   }

//   handleToggle() {
//     const content = this.shadowRoot.querySelector('.content');
//     const currentHeight = content.scrollHeight;

//     this.isOpen = !this.isOpen; // true 변경

//     if (this.isOpen) {
//       content.style.height = `${currentHeight}px`;
//     } else {
//       content.style.height = '0';
//     }
//   }

//   renderData() {
//     const data = this.dummyData[this.category] || [];
//     const totalReservations = data.reduce((acc, cur) => acc + cur.count, 0);
//     const totalCancle = data.reduce((acc, cur) => acc + cur.cancle, 0);
//     const totalAmount = totalReservations * this.pricePerReservation;
//     const maxCount = Math.max(...data.map((item) => item.count));

//     return html`
//       <div class="summary">
//         <p>
//           <strong>${this.userData.id}</strong>님은 <span>${totalReservations}회</span> 예약하셨고,
//           <span>${totalAmount.toLocaleString()}원</span> 결제하셨어요.
//         </p>
//       </div>

//       <div class="data-container">
//         ${data.map(
//           (item, index) => html`
//             <div class="data-item">
//               <div class="data-item__wrap">
//                 <div class="data-item__inner">
//                   <span class="rank">${index + 1}</span>
//                   <span class="name">${item.name}</span>
//                 </div>
//                 <span class="count">${item.count}회</span>
//               </div>
//               <div class="progress-bar">
//                 <div class="progress-fill" style="width:${(item.count / maxCount) * 100}%"></div>
//               </div>
//             </div>
//           `
//         )}
//       </div>

//       <div class="btn-container">
//         <button @click="${this.handleToggle}" class="more-btn" type="button">
//           <span>더보기</span>
//           <img
//             src="/images/ico_arrow.svg"
//             alt="아래방향 화살표"
//             class="arrow-img ${this.isOpen ? 'is--active' : ''}"
//           />
//         </button>
//         <section class="content">
//           <article class="content-inner">
//             <h2 class="a11y-hidden">더보기 컨텐츠</h2>
//             <p>
//               '함께 성장하는 바른 교육' 이듬(EUID)과 멋쟁이 사자처럼 태킷(Techit) 스쿨이 만났습니다.
//               '이듬' 교육이 지향하는 비전은 동반 성장에 있습니다. 강사에서 수강생으로 한 방향으로
//               흘러가는 지식 전달이 아닌, 함께 공감하고 이해하며 경험하는 교육 가치를 통해 공동의
//               혁신을 이끌어내는 것을 목표로 합니다. 멋쟁이 사자처럼 태킷 스쿨은 '함께'의 가치를
//               중요하게 생각합니다. 5년이 지나도, 10년이 지나도 IT 업계에 필요한 인재를 육성하는
//               교육을 제공하고, 기업의 HRD 파트너로 존재할 것이며 국내 대표 IT 교육 회사인 만큼 더
//               좋은 교육이 무엇인지를 끊임없이 고민하는 회사로 자리매김할 것입니다.
//             </p>
//           </article>
//         </section>
//       </div>

//       <div class="category-bedge">
//         <ul>
//           <li>
//             <button class="category-btn" type="button">
//               방문 <strong>${totalReservations}</strong>
//             </button>
//           </li>
//           <li>
//             <button class="category-btn" type="button">
//               예약취소 <strong>${totalCancle}</strong>
//             </button>
//           </li>
//           <li><button class="category-btn" type="button">기간선택</button></li>
//         </ul>
//       </div>
//     `;
//   }

//   render() {
//     return html`
//       <nav class="category-tab">
//         <ul>
//           <li>
//             <button
//               @click="${this.handleClickTab}"
//               type="button"
//               class="entire tab-btn ${this.category === 'all' ? 'is--active' : ''}"
//               data-category="all"
//             >
//               전체
//             </button>
//           </li>
//           <li>
//             <button
//               @click="${this.handleClickTab}"
//               type="button"
//               class="beauty tab-btn ${this.category === 'beauty' ? 'is--active' : ''}"
//               data-category="beauty"
//             >
//               뷰티
//             </button>
//           </li>
//           <li>
//             <button
//               @click="${this.handleClickTab}"
//               type="button"
//               class="hospital tab-btn ${this.category === 'hospital' ? 'is--active' : ''}"
//               data-category="hospital"
//             >
//               병의원
//             </button>
//           </li>
//           <li>
//             <button
//               @click="${this.handleClickTab}"
//               type="button"
//               class="performance tab-btn ${this.category === 'performance' ? 'is--active' : ''}"
//               data-category="performance"
//             >
//               공연
//             </button>
//           </li>
//         </ul>
//       </nav>

//       ${this.renderData()}
//     `;
//   }
// }

// customElements.define('category-tab', TabCategory);
