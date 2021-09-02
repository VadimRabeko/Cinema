'use strict';

const CURRENCY_USD = 'USD';
const CURRENCY_BYN = 'BYN';
const CONVERSATION_RATE = 2.55;
const FIRST_TRAILER = `<iframe width="560" height="315" src="https://www.youtube.com/embed/rt-2cxAiPJk" title="YouTube video player"
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
const SECOND_TRAILER = `<iframe width="560" height="315" src="https://www.youtube.com/embed/X2m-08cOAbc" title="YouTube video player" 
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
const THIRD_TRAILER = `<iframe width="560" height="315" src="https://www.youtube.com/embed/nO_DIwuGBnA" title="YouTube video player" 
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
const FIRST_KEY = 'Chosen_Spider Man: No Way Home';
const SECOND_KEY = 'Chosen_Free Guy';
const THIRD_KEY = 'Chosen_KungFury';

const VARIABLES = {
    trailer: FIRST_TRAILER,
    chosenArray: [],
    occupiedArray: [],
    key: FIRST_KEY,
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
const watchTrailerWrapper = document.getElementById('trailer');
const watchTrailer = document.getElementById('watch_trailer');
const movies = document.querySelectorAll('img');
const seats = document.querySelectorAll('.seats_place');

const shadowDiv = document.createElement('div');
const showTrailerDiv = document.createElement('div');
const closeVideoButton = document.createElement('button');
const infoDiv = document.createElement('div');
const confirmButton = document.createElement('button');
const cancelButton = document.createElement('button');
const selectedDiv = document.createElement('div');

function showTrailer() {
    shadowDiv.setAttribute('id', 'shadowDiv');
    showTrailerDiv.setAttribute('id', 'showTrailerDiv');
    closeVideoButton.setAttribute('id', 'closeVideoButton');
    closeVideoButton.innerText = 'Close';
    showTrailerDiv.innerHTML = VARIABLES.trailer;
    showTrailerDiv.append(closeVideoButton);

    document.querySelector('body').append(shadowDiv);
    wrapperDiv.append(showTrailerDiv);
}

function closeVideo() {
    shadowDiv.remove();
    showTrailerDiv.remove();
}

function cleanData() {
    VARIABLES.priceCounter = 0;
    VARIABLES.chosenArray.splice(0);
    selectedDiv.replaceWith(selectDiv);
    confirmButton.remove();
    cancelButton.remove();
}

function makeSeatsFree() {
    seats.forEach((seat) => seat.setAttribute('status', 'free'));
}

function showPreviousMovie() {
    closeVideo();
    cleanData();
    makeSeatsFree();

    const activeMovie = moviesWrapper.querySelector('.active');

    if (activeMovie.previousElementSibling) {
        activeMovie.classList.remove('active');
        activeMovie.previousElementSibling.classList.add('active');
    } else {
        activeMovie.classList.remove('active');
        movies[movies.length - 1].classList.add('active');
    }

    if (VARIABLES.trailer === FIRST_TRAILER) {
        VARIABLES.trailer = THIRD_TRAILER;
        VARIABLES.key = THIRD_KEY;
    } else if (VARIABLES.trailer === THIRD_TRAILER) {
        VARIABLES.trailer = SECOND_TRAILER;
        VARIABLES.key = SECOND_KEY;
    } else {
        VARIABLES.trailer = FIRST_TRAILER;
        VARIABLES.key = FIRST_KEY;
    }

    returnChosen(VARIABLES.key);
}

function showNextMovie() {
    closeVideo();
    cleanData();
    makeSeatsFree();

    const activeMovie = moviesWrapper.querySelector('.active');

    if (activeMovie.nextElementSibling) {
        activeMovie.classList.remove('active');
        activeMovie.nextElementSibling.classList.add('active');
    } else {
        activeMovie.classList.remove('active');
        movies[0].classList.add('active');
    }

    if (VARIABLES.trailer === FIRST_TRAILER) {
        VARIABLES.trailer = SECOND_TRAILER;
        VARIABLES.key = SECOND_KEY;
    } else if (VARIABLES.trailer === SECOND_TRAILER) {
        VARIABLES.trailer = THIRD_TRAILER;
        VARIABLES.key = THIRD_KEY;
    } else {
        VARIABLES.trailer = FIRST_TRAILER;
        VARIABLES.key = FIRST_KEY;
    }

    returnChosen(VARIABLES.key);
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
    infoDiv.innerHTML = `Seat number: ${event.target.id} Price: ${(
        event.target.getAttribute('price') * VARIABLES.price
    ).toFixed(2)} ${VARIABLES.currency} Status: ${event.target.getAttribute('status')}`;
    event.target.append(infoDiv);
}

function removeInfoSeat() {
    infoDiv.remove();
}

function selectedData(choice, totalPrice) {
    selectedDiv.innerHTML = `You chose seats ${choice}. Price: ${totalPrice.toFixed(2)} ${VARIABLES.currency}`;
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
            confirmButton.innerText = 'Confirm the choice';
            cancelButton.innerText = 'Cancel the choice';
            selectedDiv.append(confirmButton, cancelButton);
        }
    }
}

function confirmChosen() {
    document.querySelectorAll('[status=chosen]').forEach((seat) => {
        seat.setAttribute('status', 'occupied');
        VARIABLES.occupiedArray.push(seat.id);
    });
    const activeMovie = moviesWrapper.querySelector('.active');
    const chosenSeats = JSON.parse(sessionStorage.getItem(`Chosen_${activeMovie['alt']}`));
    if (chosenSeats) {
        chosenSeats.forEach((seat) => VARIABLES.occupiedArray.push(seat));
    }
    sessionStorage.setItem(VARIABLES.key, JSON.stringify(VARIABLES.occupiedArray));
    VARIABLES.occupiedArray.splice(0);
    cleanData();
}

function returnChosen(key) {
    const oldData = JSON.parse(sessionStorage.getItem(key));
    if (oldData) {
        oldData.forEach((seatID) => {
            seats.forEach((freeSeat) => {
                if (freeSeat.id === seatID) {
                    freeSeat.setAttribute('status', 'occupied');
                }
            });
        });
    }
}

screen.addEventListener('mouseover', showSliderButtons);
screen.addEventListener('mouseout', removeSliderButtons);

movieButtonPrevious.addEventListener('click', showPreviousMovie);
movieButtonNext.addEventListener('click', showNextMovie);

watchTrailer.addEventListener('click', showTrailer);
closeVideoButton.addEventListener('click', closeVideo);

buttonUSD.addEventListener('click', changeCurrency);
buttonBYN.addEventListener('click', changeCurrency);

seats.forEach((seat) => {
    seat.addEventListener('mouseover', infoSeat);
    seat.addEventListener('mouseout', removeInfoSeat);
    seat.addEventListener('click', chooseSeat);
});

confirmButton.addEventListener('click', confirmChosen);

cancelButton.addEventListener('click', () => {
    document.querySelectorAll('[status=chosen]').forEach((seat) => seat.setAttribute('status', 'free'));
    cleanData();
});

// при переключении добавить кнопки 3шт
// трейлер через асинк
