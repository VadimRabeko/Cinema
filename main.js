'use strict';

const buttonUSD = document.getElementById('button_usd');
const buttonBYN = document.getElementById('button_byn');
const seats = document.querySelectorAll('.seats_place');
const selectDiv = document.getElementById('select');

let price = 1;
let priceCounter = 0;
let switcher = false;
let chosenArray = [];
let currency = 'USD';
if (switcher) {
}

const infoDiv = document.createElement('div');
const confirmButton = document.createElement('button');
const cancelButton = document.createElement('button');
const selectedDiv = document.createElement('div');
selectedDiv.setAttribute('id', 'selected');

buttonUSD.addEventListener('click', () => {
    if (switcher) {
        price = 1;
        switcher = false;
        priceCounter /= 2.55;
        currency = 'USD';
        selectedData(chosenArray, priceCounter);
    }
});
buttonBYN.addEventListener('click', () => {
    if (!switcher) {
        price *= 2.55;
        switcher = true;
        priceCounter *= 2.55;
        currency = 'BYN';
        selectedData(chosenArray, priceCounter);
    }
});

function selectedData(choice, totalPrice) {
    selectedDiv.innerHTML = `You chose seats ${choice}. Price: ${totalPrice.toFixed(
        2
    )} ${currency}`;
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
            confirmButton.setAttribute('id', 'confirmButton');
            confirmButton.innerText = 'Confirm chosen seats';
            cancelButton.setAttribute('id', 'cancelButton');
            cancelButton.innerText = 'Cancel the choice';
            const wrapperDiv = document.getElementById('wrapper');
            wrapperDiv.append(confirmButton);
            wrapperDiv.append(cancelButton);
        }
    }
}

seats.forEach((seat) => {
    seat.addEventListener('mouseover', infoSeat);
    seat.addEventListener('mouseout', removeInfoSeat);
    seat.addEventListener('click', chooseSeat);
});

confirmButton.addEventListener('click', () => {
    document
        .querySelectorAll('[status=chosen]')
        .forEach((seat) => seat.setAttribute('status', 'paid'));
    priceCounter = 0;
    chosenArray = [];
    selectedDiv.replaceWith(selectDiv);
    confirmButton.remove();
    cancelButton.remove();
});

cancelButton.addEventListener('click', () => {
    document
        .querySelectorAll('[status=chosen]')
        .forEach((seat) => seat.setAttribute('status', 'free'));
    priceCounter = 0;
    chosenArray = [];
    selectedDiv.replaceWith(selectDiv);
    confirmButton.remove();
    cancelButton.remove();
});
