'use strict';

const buttonUSD = document.getElementById('button_usd');
const buttonBYN = document.getElementById('button_byn');
const seats = document.querySelectorAll('.seats_place');
let price = 1;
let priceCounter = 0;
let switcher = false;
let chosenArray = [];

const infoDiv = document.createElement('div');
const confirmButton = document.createElement('button');
const cancelButton = document.createElement('button');

buttonUSD.addEventListener('click', () => {
    price = 1;
    switcher = false;
});
buttonBYN.addEventListener('click', () => {
    if (switcher === false) {
        price *= 2.55;
        priceCounter *= 2.55;
        switcher = true;
    }
});

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
    if (event.target.getAttribute('status') === 'free') {
        removeInfoSeat();
        event.target.setAttribute('status', 'chosen');
        const selectDiv = document.getElementById('select');
        priceCounter += event.target.getAttribute('price') * price;
        chosenArray.push(event.target.id);

        selectDiv.innerHTML = `You chose seats ${[
            chosenArray,
        ]}. Price: ${priceCounter.toFixed(2)}`;

        if (
            !document.getElementById('confirmButton') &&
            !document.getElementById('cancelButton')
        ) {
            confirmButton.setAttribute('id', 'confirmButton');
            cancelButton.setAttribute('id', 'cancelButton');
            const wrapperDiv = document.getElementById('wrapper');
            wrapperDiv.append(confirmButton);
            wrapperDiv.append(cancelButton);
        }
    }
}

seats.forEach((item) => {
    item.addEventListener('mouseover', infoSeat);
    item.addEventListener('mouseout', removeInfoSeat);
    item.addEventListener('click', chooseSeat);
});

confirmButton.addEventListener('click', () => {
    document
        .querySelectorAll('[status=chosen]')
        .forEach((item) => item.setAttribute('status', 'paid'));
});

cancelButton.addEventListener('click', () => {
    document
        .querySelectorAll('[status=chosen]')
        .forEach((item) => item.setAttribute('status', 'free'));
});

// после оплаты аттрибут выбранный становится оплаченым
// добавить кнопку отменить выбор
// смена курса в реальном времени
