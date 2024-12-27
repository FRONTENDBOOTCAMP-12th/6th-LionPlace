import './coupon.js';

const scrollContainer = document.querySelector('.coupon-category > ul');

// 스크롤 동작 제어
scrollContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  scrollContainer.scrollBy({
    left: event.deltaY < 0 ? -100 : 100,
    behavior: 'smooth',
  });
});
