'use strict';

const buttonBYN = document.getElementById('button_byn');
const buttonUSD = document.getElementById('button_usd');
let defPrice = 1;
const seats = document.querySelectorAll('.seats_place');

buttonBYN.addEventListener('click', () => (defPrice = 1));
buttonUSD.addEventListener('click', () => defPrice * 2.55);

function chooseSeat() {
    // waiting for update
}

function infoSeat() {
    // waiting for update
}

seats.forEach((item) => item.addEventListener('click', chooseSeat));
seats.forEach((item) => item.addEventListener('mouseover', infoSeat));
