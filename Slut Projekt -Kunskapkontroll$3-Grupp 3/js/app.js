// kortarray rymmer alla kort
let card = document.getElementsByClassName("card");
let cards = [...card];

// kortlek i alla spel
const deck = document.getElementById("card-deck");

//förklarar rörlig variabel
let moves = 0;
let counter = document.querySelector(".moves");

//deklarera variabler för stjärnikoner
const stars = document.querySelectorAll(".fa-star");

//deklarerar variabel matchedCards
let matchedCard = document.getElementsByClassName("match");

 //stjärnor lista
 let starsList = document.querySelectorAll(".stars li");

 // stäng ikon i modal
 let closeicon = document.querySelector(".close");

 //förklara modal
 let modal = document.getElementById("popup1")

 //array för öppnade kort
var openedCards = [];


// blandar kort

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
};


// beskrivning blandar kort när sidan uppdateras / laddas
document.body.onload = startGame();


// beskrivningsfunktion för att starta ett nytt spel
function startGame(){
 
    // töm openCards-matrisen
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // ta bort alla befintliga klasser från varje kort
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


//   öppna och visar klass för att visa kort
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// lägg till öppnade kort i OpenedCards-listan och kontrollera om korten matchar eller inte
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


//  när korten matchar
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


//  när kort inte matchar
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// inaktivera kort tillfälligt
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


//  aktivera kort och inaktivera matchade kort
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


//  räkna player's move
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //starta timer vid första klick
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    //  rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


//  game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


//  congratulations när alla kort matchar, visar modal och flyttar, tid och betyg
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // visa congratulations modal
        modal.classList.add("show");

      
        var starRating = document.querySelector(".stars").innerHTML;

        //visa move, btyg, tid på modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

       
        closeModal();
    };
}


//  stänga icon på modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// för användare att spela om igen
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// loop att lägga event listeners till evarje kort
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
