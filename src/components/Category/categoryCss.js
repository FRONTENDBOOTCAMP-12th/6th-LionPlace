const tabs = document.querySelectorAll('button');
const reservationCount = document.getElementById('reservation-count');
const paymentAmount = document.getElementById('payment-amount');
const dataContainer = document.querySelector('.data-container');
const PRICE_PER_RESERVATION = 5000;

const userData = {
  id: '이우빈',
};

const dummyData = {
  all: [
    { name: '미랑컬헤어 상동점', count: 12 },
    { name: '리움미술관', count: 8 },
    { name: '미랑컬헤어 상동점', count: 4 },
    { name: '범이 빛나는 밤에 사가정점', count: 10 },
    { name: '범이 빛나는 밤에 명동점', count: 4 },
    { name: '범이 빛나는 밤에 혜화점', count: 7 },
  ],
  beauty: [
    { name: '미랑컬헤어 상동점', count: 12 },
    { name: '미랑컬헤어 상동점', count: 4 },
  ],
  hospital: [{ name: '리움미술관', count: 8 }],
  performance: [
    { name: '범이 빛나는 밤에 사가정점', count: 10 },
    { name: '범이 빛나는 밤에 명동점', count: 4 },
    { name: '범이 빛나는 밤에 혜화점', count: 7 },
  ],
};

// 더미데이터 랜더링 함수
function renderData(category) {
  const data = dummyData[category] || [];

  // 데이터 목록 렌더링
  dataContainer.innerHTML = data
    .map(
      (item, index) => `
       <div class="data-item">
        <div class="data-item__wrap">
          <div class="data-item__inner">
            <span class="rank">${index + 1}</span>
            <span class="name">${item.name}</span>
          </div>
          <span class="count">${item.count}회</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    `
    )
    .join('');

  updateSummary(data);
}

// 유저 업데이트 함수
function updateUser() {
  const userElement = document.getElementById('user-id');

  if (userData && userData.id) {
    userElement.textContent = userData.id;
  } else {
    userElement.textContent = '알 수 없음';
  }
}

// 예약 횟수와 결제 금액 업데이트
function updateSummary(data) {
  const totalReservations = data.reduce((acc, cur) => acc + cur.count, 0);
  const totalAmount = totalReservations * PRICE_PER_RESERVATION;

  reservationCount.textContent = `${totalReservations}회`;
  paymentAmount.textContent = `${totalAmount.toLocaleString()}원`;
}

// active 스타일
function activeTab(target) {
  tabs.forEach((tab) => tab.classList.remove('is--active'));
  target.classList.add('is--active');
}

// 탭 클릭 이벤트 핸들러
function handleTabClick(e) {
  const target = e.target;
  const category = target.dataset.category;

  activeTab(target);
  renderData(category);
}

function ininTab() {
  tabs.forEach((tab) => tab.addEventListener('click', handleTabClick));
}

// 초기 렌더링
ininTab();
updateUser();
renderData('all');
