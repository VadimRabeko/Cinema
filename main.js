'use strict';

const buttonUSD = document.getElementById('button_usd');
const buttonBYN = document.getElementById('button_byn');
const selectDiv = document.getElementById('select');
const seats = document.querySelectorAll('.seats_place');

const infoDiv = document.createElement('div');
const confirmButton = document.createElement('button');
const cancelButton = document.createElement('button');
const selectedDiv = document.createElement('div');

const chosenArray = [];
let price = 1; // можно стоздать один объект с данными, его можно будет сохранять в локал стораж
let priceCounter = 0;
let switcher = false;
let currency = 'USD';

function changeCurrency() {
    if (event.target === buttonUSD) {
        if (switcher) {
            price = 1;
            switcher = false;
            priceCounter /= 2.55;
            currency = 'USD';
            selectedData(chosenArray, priceCounter);
        }
    }
    if (event.target === buttonBYN) {
        if (!switcher) {
            price *= 2.55;
            switcher = true;
            priceCounter *= 2.55;
            currency = 'BYN';
            selectedData(chosenArray, priceCounter);
        }
    }
}

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
        priceCounter += event.target.getAttribute('price') * price;
        chosenArray.push(event.target.id);

        selectedData(chosenArray, priceCounter);

        if (!document.getElementById('selected')) {
            selectDiv.replaceWith(selectedDiv);
        }

        if (
            !document.getElementById('confirmButton') &&
            !document.getElementById('cancelButton')
        ) {
            selectedDiv.setAttribute('id', 'selected');
            confirmButton.setAttribute('id', 'confirmButton');
            confirmButton.innerText = 'Confirm chosen seats';
            cancelButton.setAttribute('id', 'cancelButton');
            cancelButton.innerText = 'Cancel the choice';
            const wrapperDiv = document.getElementById('wrapper');
            wrapperDiv.append(confirmButton, cancelButton);
        }
    }
}

function selectedData(choice, totalPrice) {
    selectedDiv.innerHTML = `You chose seats ${choice}. Price: ${totalPrice.toFixed(
        2
    )} ${currency}`;
}

function cleanData() {
    priceCounter = 0;
    chosenArray.splice(0);
    selectedDiv.replaceWith(selectDiv);
    confirmButton.remove();
    cancelButton.remove();
}

buttonUSD.addEventListener('click', changeCurrency);
buttonBYN.addEventListener('click', changeCurrency);

seats.forEach((seat) => {
    seat.addEventListener('mouseover', infoSeat);
    seat.addEventListener('mouseout', removeInfoSeat);
    seat.addEventListener('click', chooseSeat);
});

confirmButton.addEventListener('click', () => {
    document
        .querySelectorAll('[status=chosen]')
        .forEach((seat) => seat.setAttribute('status', 'paid'));
    cleanData();
});

cancelButton.addEventListener('click', () => {
    document
        .querySelectorAll('[status=chosen]')
        .forEach((seat) => seat.setAttribute('status', 'free'));
    cleanData();
});
