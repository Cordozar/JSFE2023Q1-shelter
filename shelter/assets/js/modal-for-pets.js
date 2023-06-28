const sliderContainer = document.querySelector('.slider__inner');
const sliderCard = document.querySelector('.card');
const sliderControls = document.querySelectorAll('.slider__controls');

const modal = document.querySelector('.modal');
const modalWrapper = document.querySelector('.modal-wrapper');

alert(
  'На этой странице пагинация и отображение карточек из JSON файла не работает, но модалку сделал, которая берёт данные из JSON файла. Вывод модалок согласно очереди в JSON файле.'
);

sliderContainer.addEventListener('click', (e) => {
  if (e.target.closest('.card')) {
    modal.classList.add('modal-active');
    body.classList.add('body-no-scroll');
    elementSearch = `.${e.target.getAttribute('class')}`;
    const arr = document.querySelectorAll(elementSearch);

    let numCardOnCurrArr;

    arr.forEach((el, i) => {
      if (el === e.target) {
        numCardOnCurrArr = i;
      }
    });

    function createModal(cards) {
      modalWrapper.innerHTML = '';
      for (let i = 0; i < cards.length; i++) {
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
    body.classList.remove('body-right-padding');
  }
});
