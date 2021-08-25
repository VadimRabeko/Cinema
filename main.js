'use strict';

const buttonUSD = document.getElementById('button_usd');
const buttonBYN = document.getElementById('button_byn');
let price = 1;
let priceCounter = 0;
let switcher = false;
let chosenArray = [];

const seats = document.querySelectorAll('.seats_place');
// const seatsPrice = document.

buttonUSD.addEventListener('click', () => {
    price = 1;
    switcher = false;
});
buttonBYN.addEventListener('click', () => {
    if (switcher === false) {
        price *= 2.55;
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

    priceCounter += event.target.getAttribute('price') * price;
    chosenArray.push(event.target.id);

    selectDiv.innerHTML = `You chose seats ${[
        chosenArray,
    ]}. Price: ${priceCounter}`; // добавить массив выбраных мест // добавить кнопку подтвердить заказ
}

seats.forEach((item) => {
    item.addEventListener('mouseover', infoSeat);
    item.addEventListener('mouseout', removeInfoSeat);
    item.addEventListener('click', chooseSeat);
});

// сделать объект в котором будут храниться цены всех выбранных мест и значение в этом объекте будет выводиться за вю цену либо каунтер
