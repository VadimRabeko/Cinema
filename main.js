'use strict';

const buttonUSD = document.getElementById('button_usd');
const buttonBYN = document.getElementById('button_byn');
let price = 1;
let switcher = false;
const seats = document.querySelectorAll('.seats_place');
// const seatsPrice = document.

buttonUSD.addEventListener('click', () => {
    price = 1;
    switcher = false;
});
buttonBYN.addEventListener('click', () => {
    if (switcher === false) {
        price = price * 2.55;
        switcher = true;
    }
});

const infoDiv = document.createElement('div');

function infoSeat() {
    infoDiv.setAttribute('class', 'seats_info');
    infoDiv.innerHTML = `Seat number: ${event.target.id} Price: ${
        event.target.getAttribute('price') * price
    } Status: ${event.target.getAttribute('status')}`;
    event.target.append(infoDiv);
}

function removeInfoSeat() {
    infoDiv.remove();
}

function chooseSeat() {
    removeInfoSeat(); // после оплаты аттрибут выбранный становится оплаченым
    event.target.setAttribute('status', 'chosen'); //добавить кнопку отменить выбор
    const selectDiv = document.getElementById('select');
    const selectedDiv = document.createElement('div');

    if (selectedDiv) {
        selectedDiv.setAttribute('id', 'selected');
        document.body.append(selectedDiv);
        selectDiv.replaceWith(selectedDiv);
    }

    selectedDiv.innerHTML = `You chose seats XXXXXX. Price: ${price}`; // добавить массив выбраных мест
}

seats.forEach((item) => {
    item.addEventListener('mouseover', infoSeat);
    item.addEventListener('mouseout', removeInfoSeat);
    item.addEventListener('click', chooseSeat);
});
