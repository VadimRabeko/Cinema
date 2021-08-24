'use strict';

const buttonBYN = document.getElementById('button_byn');
const buttonUSD = document.getElementById('button_usd');
let defPrice = 1;
const seats = document.querySelectorAll('.seats_place');

buttonBYN.addEventListener('click', () => (defPrice = 1));
buttonUSD.addEventListener('click', () => defPrice * 2.55);

const infoDiv = document.createElement('div');

function infoSeat() {
    infoDiv.setAttribute('class', 'seats_info');
    infoDiv.innerHTML = `Seat number ${event.target.id}`;
    event.target.append(infoDiv);
    // добавить статсус из атрибутов которые будут меняться и цену
}

function removeInfoSeat() {
    infoDiv.remove();
}

function chooseSeat() {
    removeInfoSeat(); // после оплаты аттрибут выбранный становится оплаченым
    event.target.setAttribute('status', 'chosen'); //добавить кнопку отменить выбор
    const selectDiv = document.getElementById('select'); // добавить посыл данных в селектед
    const selectedDiv = document.createElement('div');

    if (!0 /* если выбранного нет, то создать! сусловие! */) {
        selectedDiv.setAttribute('id', 'selected');
        document.body.append(selectedDiv);
        selectDiv.replaceWith(selectedDiv);
    }

    selectedDiv.innerHTML = 'kek';
}

seats.forEach((item) => {
    item.addEventListener('mouseover', infoSeat);
    item.addEventListener('mouseout', removeInfoSeat);
    item.addEventListener('click', chooseSeat);
});
