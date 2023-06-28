const body = document.body;
const header = document.querySelector('.header_flex-container');
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.header__nav');
const canvas = document.querySelector('.canvas');
const navLinks = document.querySelectorAll('.header__nav-link');
const selectNavLink = document.querySelector('.header__nav-link-selected');

selectNavLink.addEventListener('click', (event) => {
  event.preventDefault();
});

function showBurger() {
  header.addEventListener('click', (event) => {
    if (event.target.closest('.burger')) {
      burger.classList.toggle('burger-active');
      navigation.classList.toggle('header__nav-active');
      body.classList.toggle('body-no-scroll');
      canvas.classList.toggle('canvas-active');
    }
  });
}
showBurger();

function closeBurger() {
  canvas.addEventListener('click', (event) => {
    if (event.target === canvas) {
      burger.classList.remove('burger-active');
      canvas.classList.remove('canvas-active');
      navigation.classList.remove('header__nav-active');
      body.classList.remove('body-no-scroll');
    }
  });
  navLinks.forEach((el) => {
    el.addEventListener('click', () => {
      burger.classList.remove('burger-active');
      canvas.classList.remove('canvas-active');
      navigation.classList.remove('header__nav-active');
      body.classList.remove('body-no-scroll');
    });
  });
}

closeBurger();
