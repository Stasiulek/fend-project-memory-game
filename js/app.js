//UI variables
var deck = document.querySelector('.deck');
var cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb',
];
var starsList = document.querySelectorAll('.stars li');
var restartBtn = document.querySelector('.restart');
var timerButton = document.getElementById('timerButton');
var clickToStart = document.querySelector('.deck');
var intro = document.getElementById('intro');
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var modalTime = document.getElementById('finishTime');
var modalMoves = document.getElementById('finishMoves');
var movesValue = document.querySelector('#movesMade');
var userSubmit = document.getElementById('userSubmit');
//logic variables
var timerRunning = false;
var myInterval = null;
//init variables
var moves = 0;
var sec = 0;
var cardCounter = [];
var matchCounter = [];
var i = 0;
var isStartGame = true;

//FUNCTIONS _______

//create a shuffled deck of cards
function createCard(card) {
    return `<li class="card" data-icon="fa-${card}">
    <i class="fa ${card}"></i>`;
}
function startGame() {
    var dynamicCard = shuffle(cards).map(function (card) {
        return createCard(card);
    });
    deck.innerHTML = dynamicCard.join('');
    addCardEvents();
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
startGame();

//start game 
clickToStart.addEventListener("click", function () {
    if (isStartGame) {
        intro.innerHTML = 'Game has begun!';
        timerRunning = true;
        timerButton.style.visibility = "visible";
        myInterval = setInterval(myTimer, 1000);
        isStartGame = false;
    }
});

timerButton.addEventListener('click', function (event) {
    if (timerRunning === true) {
        clearInterval(myInterval);
        timerRunning = false;
        timerButton.innerHTML = 'Resume';
    } else {
        timerButton.innerHTML = 'Pause';
        myInterval = setInterval(myTimer, 1000);
        timerRunning = true;
    }
})

restartBtn.addEventListener("click", function () {
    restartGame();
})

//timer
function pad(val) {
    return val > 9 ? val : "0" + val;
}
function myTimer() {
    var seconds = pad(++sec % 60).toString()
    var minutes = pad(parseInt(sec / 60, 10)).toString()
    document.getElementById("time").innerHTML = minutes + ":" + seconds
}

//restart game
function restartGame() {
    isStartGame = true;
    startGame();
    clearInterval(myInterval);
    sec = 0;
    document.getElementById("time").innerHTML = "00:00";
    cardCounter = [];
    matchCounter = [];
    intro.innerHTML = 'Click on any card to start the game!';
    var allCards = document.querySelectorAll('.card');
    allCards.forEach(function (el) {
        el.classList.remove('open', 'show', 'match');
    });
    for (i = 0; i < starsList.length; i++) {
        starsList[i].classList.remove('d-none');
    }
    i = 0;
    timerButton.style.visibility = "hidden";
    movesValue.innerHTML = '0';
    moves = 0;
}

//check for match
function addCardEvents() {
    var allCards = document.querySelectorAll('.card');
    allCards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            var cardCounterLength = cardCounter.length;
            switch (cardCounterLength) {
                case 0:
                    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                        cardCounter.push(card);
                        card.classList.add('open', 'show');
                    }
                    break;
                case 1:
                    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                        cardCounter.push(card);
                        card.classList.add('open', 'show');

                        if (cardCounter[0].dataset.icon === cardCounter[1].dataset.icon) {
                            cardCounter[0].classList.add('match');
                            cardCounter[1].classList.add('match');
                            matchCounter++;
                            cardCounter = [];
                            if (matchCounter == 8) {
                                win();
                            }
                        }

                        moveCounter();
                        setTimeout(function () {
                            if (cardCounterLength === 2) {
                                allCards.forEach(function (el) {
                                    el.classList.remove('open', 'show');
                                    cardCounter = [];
                                })
                            }
                        }, 1000);
                    }
                    break;
                default:
                    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                        allCards.forEach(function (el) {
                            el.classList.remove('open', 'show');
                            cardCounter = [];
                        });
                        cardCounter.push(card);
                        card.classList.add('open', 'show');
                    }
            }
        });
    });
}

//star rating decay
function moveCounter() {
    moves++;
    movesValue.innerHTML = moves;
    if (moves == 1 || moves == 2 || moves == 3) {
        removeStar();
    }
}

function removeStar() {
    starsList[i].classList.add('d-none');
    i++;
}

//Win game
function win() {
    clearInterval(myInterval);
    modal.style.display = "block";
    finishTime = time.innerHTML;
    document.getElementById("modalTime").innerHTML = finishTime;
    finishMoves = movesMade.innerHTML;
    document.getElementById("modalMoves").innerHTML = finishMoves;

    var countStars = document.querySelectorAll('.stars > li').length - document.querySelectorAll('.stars > li.d-none').length;
    if (countStars !== 1) {
        document.getElementById("starRating").innerHTML = countStars + ' stars';
    } else {
        document.getElementById("starRating").innerHTML = countStars + ' star';
    }
}

//win modal
btn.onclick = function () {
    modal.style.display = "none";
    restartGame();
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


userSubmit.onclick = function (e) {
    promptUser();
}

function promptUser() {
    var userName = prompt("Please enter your name", "Some gender-neutral name");
    if (userName != null && userName === 'Nadja' || userName === 'nadja' || userName === 'potor' ||userName === 'Potor' || userName === 'Bubba') {
        alert('Hey Bubba, I miss you and I love you very much! Pssst..');
    } else if (userName != null && userName === 'Joe' || userName === 'Joseph' || userName === 'joe' || userName === 'joseph') {
        alert('Hey Joey you QT pie');
    } else if (userName != null && userName === 'Josh' || userName === 'josh' || userName === 'jish' || userName === 'joshua' || userName === 'Jish') {
        alert('Hey Jish doddi is watching you and knows u r a fgt');
    }
    else if (userName != null) {
        alert('Hello ' + userName);
    }
}


//   case 1: john / John

//   case 2: Vince / Vincent

//   case 3: Chibi / Andrea

//   case 4: Nadja / Potor / Potot / Bubba / Skarb
