const sliderContainer = document.querySelector('.slider__inner');
const sliderCard = document.querySelector('.card');
const sliderControls = document.querySelectorAll('.slider__controls');
const cardWidth = sliderCard.clientWidth;
let containerWidth = sliderContainer.clientWidth;

let cardsPerScreen = Math.floor(containerWidth / cardWidth);

window.addEventListener('beforeunload', function () {
  history.replaceState(null, null, null);
});

window.addEventListener('resize', () => {
  containerWidth = sliderContainer.clientWidth;
  cardsPerScreen = containerWidth / cardWidth;
  if (cardsPerScreen >= 3) {
    cardsPerScreen = 3;
  }
  if (cardsPerScreen >= 2 && cardsPerScreen < 3) {
    cardsPerScreen = 2;
  }
  if (cardsPerScreen >= 1 && cardsPerScreen < 2) {
    cardsPerScreen = 1;
  }
  init();
  render();
});

let pastArr;
let currArr;
let nextArr;

function createArr(arr1, arr2 = []) {
  for (let i = 0; i < cardsPerScreen; i++) {
    const num = Math.floor(Math.random() * 8);
    if (!arr1.includes(num) && !arr2.includes(num)) {
      arr1.push(num);
    } else {
      i -= 1;
    }
  }
}

// function refreshPage {

// }

function init() {
  pastArr = [];
  currArr = [];
  nextArr = [];

  createArr(nextArr);

  currArr = [...nextArr];
  nextArr = [];

  createArr(nextArr, currArr);

  pastArr = [...currArr];
  currArr = [];

  currArr = [...nextArr];
  nextArr = [];

  createArr(nextArr, currArr);
  // console.log(pastArr, currArr, nextArr);
}
init();
render();

function forward() {
  pastArr = [];
  pastArr = [...currArr];
  currArr = [];
  currArr = [...nextArr];
  nextArr = [];
  createArr(nextArr, currArr);
  history.pushState('forward', null, '');
  // console.log(`${history.state}`);
  // console.log(`Вперед`);
}

function changeToBackward() {
  let temp = pastArr;
  pastArr = currArr;
  currArr = temp;
  nextArr = [];
  createArr(nextArr, currArr);
  history.pushState('changeToBackward', null, '');
  // console.log(`${history.state}`);
  // console.log(`Назад после Вперед`);
}

function backward() {
  nextArr = [];
  nextArr = [...currArr];
  currArr = [];
  currArr = [...pastArr];
  pastArr = [];
  createArr(pastArr, currArr);
  history.pushState('backward', null, '');
  // console.log(`${history.state}`);
  // console.log(`Назад`);
}

function changeToForward() {
  let temp = nextArr;
  nextArr = currArr;
  currArr = temp;
  pastArr = [];
  createArr(pastArr, currArr);
  history.pushState('changeToForward', null, '');
  // console.log(`${history.state}`);
  // console.log(`Вперед после Назад`);
}

function render() {
  function addCards(cards) {
    sliderContainer.innerHTML = '';
    currArr.forEach((el) => {
      for (let i = 0; i < cards.length; i++) {
        if (el === i) {
          sliderContainer.innerHTML += `<div class="slider__card card">
                                            <img class="card__photo" src="${cards[i]['img']}" alt="pet photo">
                                            <span class="card__pet-name">${cards[i]['name']}</span>
                                            <button class="card__btn">Learn more</button>
                                          </div>`;
        }
      }
    });
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../assets/js/pets.json', true);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const pets = JSON.parse(xhr.responseText);
      addCards(pets);
    } else {
      console.log('Error');
    }
  };
}

render();

function forwardMove() {
  if (
    history.state === 'forward' ||
    history.state === null ||
    history.state === 'changeToForward'
  ) {
    forward();
  } else {
    changeToForward();
    // history.pushState(null, null, '');
  }
  render();
}
function backwardMove() {
  if (
    history.state == 'backward' ||
    history.state === null ||
    history.state === 'changeToBackward'
  ) {
    backward();
  } else {
    changeToBackward();
    // history.pushState(null, null, '');
  }
  render();
}

sliderControls[0].addEventListener('click', () => {
  backwardMove();
});
sliderControls[1].addEventListener('click', () => {
  forwardMove();
});

// popup

const modal = document.querySelector('.modal');
const modalWrapper = document.querySelector('.modal-wrapper');

sliderContainer.addEventListener('click', (e) => {
  if (e.target.closest('.card')) {
    modal.classList.add('modal-active');
    body.classList.add('body-no-scroll');
    elementSearch = `.${e.target.getAttribute('class')}`;
    const arr = document.querySelectorAll(elementSearch);

    let numCardOnCurrArr;

    arr.forEach((el, i) => {
      if (el === e.target) {
        numCardOnCurrArr = currArr[i];
      }
    });

    function createModal(cards) {
      modalWrapper.innerHTML = '';
      for (let i = 0; i < cards.length; i++) {
        // console.log('yes');
        if (numCardOnCurrArr === i) {
          modalWrapper.innerHTML += `<div class="modal-content">
                                        <img class="modal-img" src="${cards[i]['img']}" alt="pet">
                                        <div class="modal-text-block">
                                        <h3 class="modal-pet-name">
                                        ${cards[i]['name']}
                                        </h3>
                                        <p class="maodal-pet-type">
                                        ${cards[i]['type']} - ${cards[i]['breed']}
                                        </p>
                                        <p class="modal-pet-description">
                                        ${cards[i]['description']}
                                        </p>
                                        <div class="modal-pet-characteristics">
                                          <div><span class="modal-pet-characteristic">Age:</span> ${cards[i]['age']}</div>
                                          <div><span class="modal-pet-characteristic">Inoculations:</span> ${cards[i]['inoculations']}</div>
                                          <div><span class="modal-pet-characteristic">Diseases:</span> ${cards[i]['diseases']}</div>
                                          <div><span class="modal-pet-characteristic">Parasites:</span> ${cards[i]['parasites']}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="modal-close"><img src="../assets/img/Vector.svg" alt="close"></div>`;
        }
      }
    }

    const request = new XMLHttpRequest();
    request.open('GET', '../assets/js/pets.json', true);
    request.send();
    request.onload = function () {
      if (request.status === 200) {
        const pets = JSON.parse(request.responseText);
        createModal(pets);
      } else {
        console.log('Error');
      }
    };
  }
});

body.addEventListener('click', (e) => {
  if (e.target.closest('.modal') && !e.target.closest('.modal-content')) {
    modal.classList.remove('modal-active');
    body.classList.remove('body-no-scroll');
  }
});
