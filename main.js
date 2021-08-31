'use strict';

const CURRENCY_USD = 'USD';
const CURRENCY_BYN = 'BYN';
const CONVERSATION_RATE = 2.55;
const VARIABLES = {
    chosenArray: [],
    price: 1,
    priceCounter: 0,
    switcher: false,
    currency: CURRENCY_USD,
};

const buttonUSD = document.getElementById('button_usd');
const buttonBYN = document.getElementById('button_byn');
const wrapperDiv = document.getElementById('wrapper');
const selectDiv = document.getElementById('select');
const screen = document.getElementById('screen');
const movieButtonPrevious = document.getElementById('movieButtonPrevious');
const movieButtonNext = document.getElementById('movieButtonNext');
const moviesWrapper = document.getElementById('screen_images');
const movies = document.querySelectorAll('img');
const seats = document.querySelectorAll('.seats_place');

const infoDiv = document.createElement('div');
const confirmButton = document.createElement('button');
const cancelButton = document.createElement('button');
const selectedDiv = document.createElement('div');

movieButtonPrevious.addEventListener('click', showPreviousMovie);
movieButtonNext.addEventListener('click', showNextMovie);

function showPreviousMovie() {
    const activeMovie = moviesWrapper.querySelector('.active');

    if (activeMovie.previousElementSibling) {
        activeMovie.classList.remove('active');
        activeMovie.previousElementSibling.classList.add('active');
    } else {
        activeMovie.classList.remove('active');
        movies[movies.length - 1].classList.add('active');
    }
}

function showNextMovie() {
    const activeMovie = moviesWrapper.querySelector('.active');

    if (activeMovie.nextElementSibling) {
        activeMovie.classList.remove('active');
        activeMovie.nextElementSibling.classList.add('active');
    } else {
        activeMovie.classList.remove('active');
        movies[0].classList.add('active');
    }
}

function showSliderButtons() {
    movieButtonPrevious.classList.add('active');
    movieButtonNext.classList.add('active');
}

function removeSliderButtons() {
    movieButtonPrevious.classList.remove('active');
    movieButtonNext.classList.remove('active');
}

function changeCurrency() {
    if (event.target === buttonUSD) {
        if (VARIABLES.switcher) {
            VARIABLES.price = 1;
            VARIABLES.switcher = false;
            VARIABLES.priceCounter /= CONVERSATION_RATE;
            VARIABLES.currency = CURRENCY_USD;
            selectedData(VARIABLES.chosenArray, VARIABLES.priceCounter);
        }
    }
    if (event.target === buttonBYN) {
        if (!VARIABLES.switcher) {
            VARIABLES.price *= CONVERSATION_RATE;
            VARIABLES.switcher = true;
            VARIABLES.priceCounter *= CONVERSATION_RATE;
            VARIABLES.currency = CURRENCY_BYN;
            selectedData(VARIABLES.chosenArray, VARIABLES.priceCounter);
        }
    }
}

function infoSeat() {
    infoDiv.setAttribute('class', 'seats_info');
    infoDiv.innerHTML = `Seat number: ${event.target.id} Price: ${
        event.target.getAttribute('price') * VARIABLES.price
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
        VARIABLES.priceCounter += event.target.getAttribute('price') * VARIABLES.price;
        VARIABLES.chosenArray.push(event.target.id);

        selectedData(VARIABLES.chosenArray, VARIABLES.priceCounter);

        if (!document.getElementById('selected')) {
            selectDiv.replaceWith(selectedDiv);
        }

        if (!document.getElementById('confirmButton') && !document.getElementById('cancelButton')) {
            selectedDiv.setAttribute('id', 'selected');
            confirmButton.setAttribute('id', 'confirmButton');
            cancelButton.setAttribute('id', 'cancelButton');
            confirmButton.innerText = 'Confirm chosen seats';
            cancelButton.innerText = 'Cancel the choice';
            wrapperDiv.append(confirmButton, cancelButton);
        }
    }
}

function selectedData(choice, totalPrice) {
    selectedDiv.innerHTML = `You chose seats ${choice}. Price: ${totalPrice.toFixed(2)} ${VARIABLES.currency}`;
}

function cleanData() {
    VARIABLES.priceCounter = 0;
    VARIABLES.chosenArray.splice(0);
    selectedDiv.replaceWith(selectDiv);
    confirmButton.remove();
    cancelButton.remove();
}

screen.addEventListener('mouseover', showSliderButtons);
screen.addEventListener('mouseout', removeSliderButtons);

buttonUSD.addEventListener('click', changeCurrency);
buttonBYN.addEventListener('click', changeCurrency);

seats.forEach((seat) => {
    seat.addEventListener('mouseover', infoSeat);
    seat.addEventListener('mouseout', removeInfoSeat);
    seat.addEventListener('click', chooseSeat);
});

confirmButton.addEventListener('click', () => {
    document.querySelectorAll('[status=chosen]').forEach((seat) => seat.setAttribute('status', 'paid'));
    cleanData();
});

cancelButton.addEventListener('click', () => {
    document.querySelectorAll('[status=chosen]').forEach((seat) => seat.setAttribute('status', 'free'));
    cleanData();
});
