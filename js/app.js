/*
 * Create a list that holds all of your cards
 */
var cards = document.querySelectorAll('.card');

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];


var cardCounter = [];
var matchCounter = [];
cards.forEach(function(card){
    
	card.addEventListener('click', function(e) {

        

            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') ){

                cardCounter.push(card);
                card.classList.add('open', 'show');
            
                if (cardCounter[0].dataset.icon === cardCounter[1].dataset.icon) {
                    

                    cardCounter[0].classList.add('match');
                    cardCounter[1].classList.add('match');

                    console.log('cards match!!!');
                    matchCounter ++;
                    console.log(`match counter is: ${matchCounter}`);

                    

                    //change to 8 once cards are rendered programatically and game starts with all cards face down
                    if (matchCounter == 7) {
                        modal.style.display = "block";
                    
                    span.onclick = function() {
                        modal.style.display = "none";
                    };
                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    };
                    }
                    
                        
                }
                //if cards do not match, hide them
                if (cardCounter.length == 2) {
                    setTimeout(function(){
                        console.log('reset cardCounter now!')
                        
                        console.log(cardCounter.length);
                        cards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        })
                    }, 1000);
                    cardCounter = [];
                    
                }
                
            }

            // if (cards.classList.contains('match')) {
            //     alert('win');
            // }


   
	});
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
