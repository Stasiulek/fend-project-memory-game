//UI vars
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
//LOGIC vars
var timerRunning = false;
var myInterval = null;

//FUNCTIONALITY/FEATURE vars init
var moves = 0;
var sec = 0;
var cardCounter = [];
var matchCounter = [];



//FUNCTIONS

// STAR RATING (needs refactoring!)
function moveCounter() {
    moves++; 
    movesValue.innerHTML = moves;
    if (moves == 1) {
        removeStar();
    } else if (moves == 2) {
        removeStar1();
    } else if (moves == 3) {
        removeStar2();
    }
}

function removeStar() {
    starsList[0].classList.add('d-none');
}
function removeStar1() {
    starsList[1].classList.add('d-none');
}
function removeStar2() {
    starsList[2].classList.add('d-none');
}

//TIMER
function pad(val) {
    return val > 9 ? val : "0" + val;
}

function myTimer() {
    var seconds = pad(++sec % 60).toString()
    var minutes = pad(parseInt(sec / 60, 10)).toString()
    document.getElementById("time").innerHTML = minutes + ":" + seconds
}

//START GAME
clickToStart.addEventListener("click", function () {
    intro.innerHTML = 'Game has begun!';
    timerRunning = true;
    timerButton.innerHTML = 'Pause';
    myInterval = setInterval(myTimer, 1000);

}, { once: true });

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

//MODAL
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

//CREATE DECK OF CARDS
function createCard(card) {
    return `<li class="card" data-icon="fa-${card}">
    <i class="fa ${card}"></i>`;
}
function startGame() {
    var dynamicCard = shuffle(cards).map(function (card) {
        return createCard(card);
    });
    deck.innerHTML = dynamicCard.join('');
}
startGame();

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

var cards = document.querySelectorAll('.card');
cards.forEach(function (card) {
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
                            // clearInterval(myInterval);
                            // modal.style.display = "block";
                            // finishTime = time.innerHTML;
                            // document.getElementById("modalTime").innerHTML = finishTime;
                        }
                    }

                    moveCounter();
                    setTimeout(function () {
                        if (cardCounterLength === 2) {
                            cards.forEach(function (el) {
                                el.classList.remove('open', 'show');
                                cardCounter = [];
                            })
                        }
                    }, 1000);
                }
                break;
            default:
                if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                    cards.forEach(function (el) {
                        el.classList.remove('open', 'show');
                        cardCounter = [];
                    });
                    cardCounter.push(card);
                    card.classList.add('open', 'show');
                }
        }
    });
});

//Refactor to reset variables instead of hardcoding write to .innerHTML?
function restartGame() {
    clearInterval(myInterval);
    sec = 0;
    document.getElementById("time").innerHTML = "00:00";
    cardCounter = [];
    matchCounter = [];
    cards.forEach(function (el) {
        el.classList.remove('open', 'show', 'match');
        cardCounter = [];
    });
    starsList[0].classList.remove('d-none');
    starsList[1].classList.remove('d-none');
    starsList[2].classList.remove('d-none');
    movesValue.innerHTML = '0';
    moves = 0;
    //unbind click on deck to start timer
    clickToStart.removeEventListener("click", function () {
    });
    //re-add first-click on deck to start timer again
    clickToStart.addEventListener("click", function () {
        intro.innerHTML = 'Game has begun!';
        timerRunning = true;
        timerButton.innerHTML = 'Pause';
        myInterval = setInterval(myTimer, 1000);
    
    }, { once: true });
}

restartBtn.addEventListener("click", function () {
    restartGame();
})


