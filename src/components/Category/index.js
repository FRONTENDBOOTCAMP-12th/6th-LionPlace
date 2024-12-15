import '@/components/Time/time';
import '@/components/ProfileAll/profileAll';
import '@/components/Navigation/navigation';
import '@/components/Tab/tab';
import '@/components/Tab/customElement';

const tabBtn = document.querySelectorAll('.tab-btn');
const dataContainer = document.querySelector('.data-container');
const reservationCount = document.getElementById('reservation-count');
const paymentAmount = document.getElementById('payment-amount');
const PRICE_PER_RESERVATION = 5000;

const userData = {
  id: 'Lion',
};

const dummyData = {
  all: [
    { name: '미랑컬헤어 상동점', count: 12 },
    { name: '리움미술관', count: 8 },
    { name: '미랑컬헤어 상동점', count: 4 },
    { name: '범이 빛나는 밤에 사가정점', count: 10 },
  ],
  beauty: [
    { name: '미랑컬헤어 상동점', count: 12 },
    { name: '미랑컬헤어 상동점', count: 4 },
  ],
  hospital: [{ name: '리움미술관', count: 8 }],
  performance: [{ name: '범이 빛나는 밤에 사가정점', count: 10 }],
};

// 데이터 랜더링 함수
function renderData(value) {
  const data = dummyData[value] || [];

  dataContainer.innerHTML = data
    .map(
      (item, index) =>
        `
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
  updateProgressBars(data);
}

// 총 예약, 총 결제 금액 계산 함수
function updateSummary(data) {
  const totalReservations = data.reduce((acc, cur) => acc + cur.count, 0);
  const totalAmount = totalReservations * PRICE_PER_RESERVATION;

  reservationCount.innerHTML = `${totalReservations}회`;
  paymentAmount.innerHTML = `${totalAmount.toLocaleString()}원`;
}

// 유저명 업데이트 함수
function updateUser() {
  const userElement = document.getElementById('user-id');

  if (userData && userData.id) {
    userElement.innerHTML = userData.id;
  } else {
    userElement.innerHTML = '알 수 없음';
  }
}

// 활성화 스타일 함수
function activeStyle(target) {
  tabBtn.forEach((item) => item.classList.remove('is--active'));
  target.classList.add('is--active');
}

// 클릭 이벤트 함수
function handleTabClick(e) {
  const target = e.target;
  const category = target.dataset.category;

  activeStyle(target);
  renderData(category);
}

// 프로그래스바 함수
function updateProgressBars(data) {
  const progressBars = document.querySelectorAll('.progress-fill');
  const maxCount = Math.max(...data.map((item) => item.count)); // 최대값
  progressBars.forEach((item, index) => {
    item.style.width = `${(data[index].count / maxCount) * 100}% `; // 비율 계산
  });
}

// 초기화 함수
function initTab() {
  tabBtn.forEach((btn) => btn.addEventListener('click', handleTabClick));
}

// 초기 랜더링
initTab();
updateUser();
renderData('all');
