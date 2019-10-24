/*
* Create a list that holds all of your cards
*/
let pictures = ["fa fa-anchor", "fa fa-bolt", "fa fa-bomb", "fa fa-bicycle",
    "fa fa-cube", "fa fa-diamond", "fa fa-leaf", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-bolt", "fa fa-bomb", "fa fa-bicycle",
    "fa fa-cube", "fa fa-diamond", "fa fa-leaf", "fa fa-paper-plane-o",
];
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



let allCards = document.querySelector('.deck');
let stars = document.querySelector('.stars');
let numberOfMoves = document.querySelector('.moves');
let timeElement = document.querySelector('.timer');
let restart = document.querySelector('.restart');
let modal = document.getElementById("myModal")
let span = document.getElementsByClassName("close")[0];
let showEndTime = document.querySelector(".modal-end-time");
let starRating = document.querySelector(".modal-star-rating");
let ulStarsRings = document.querySelector(".modal-ul-stars-rings");
let finalMoves = document.querySelector(".modal-final-moves")
let refresh=document.querySelector(".fa-refresh");

let shufflePicturs=[];
let seconds = 0, minutes = 0, currentTime;
let arrayOftwoCard=[];
let doneCards;
let movesCount;
let endTime;

newGame();

function newGame() {
  //here I get back everything to zero for new game
   showEndTime.innerHTML = "you finsh in: ";
   finalMoves.innerHTML = "Moves: ";
    timeElement.innerHTML = "00:00";
    numberOfMoves.innerHTML= 0;
    seconds = 0; minutes = 0;
    movesCount=0;
    doneCards=0;
    arrayOftwoCard=[];
    shufflePicturs = shuffle(pictures);
    for (let i =0 ; i< 3; i++) {
        stars.children[i].children[0].style.color='gold';
    }

 //shuffle and close all the cards
    for(let i=0; i<allCards.children.length ; i++) {
        allCards.children[i].className =('card');
        allCards.children[i].children[0].className= (shufflePicturs[i]);
    }
 //here start to respone to click
    allCards.addEventListener('click',function() {
      if (movesCount===0&&event) {
        timer();
        clickOnCard(event);
      }
      else {
        clickOnCard(event);
      }
    });

}

function clickOnCard(event) {

    let card = event.target;
  // check if the player click on cards
    if (card.nodeName=="LI" && !card.classList.contains("open", "show", "match")) {
        movesCount+=1;
        goldStars();
        numberOfMoves.innerHTML= movesCount;
        card.classList.add('open','show')
        arrayOftwoCard.push(card);
    }

  //check if the player click two cards
    if (arrayOftwoCard.length === 2) {
        arrayOftwoCard[0].classList.add('open','show')
        arrayOftwoCard[1].classList.add('open','show')
  //check if the cards matching or not
        if (arrayOftwoCard[0].children[0].className !== arrayOftwoCard[1].children[0].className) {
            console.log('BAD');
            setTimeout(rongCards, 400);
        }
        else {
            console.log('GOOD');
            arrayOftwoCard[0].classList.add('match')
            arrayOftwoCard[1].classList.add('match')
            doneCards += 2;
            if(doneCards!==16) {
                arrayOftwoCard=[];
              }
            else {
                //you win;
                endTime = minutes +':'+ seconds;
                clearTimeout(currentTime);
                Congratulations();
             }
           }
    }
}

function rongCards() {
   arrayOftwoCard[0].classList.remove('open','show')
   arrayOftwoCard[1].classList.remove('open','show')
   arrayOftwoCard=[];
}


function Congratulations(){
    modal.style.display = "block";
    showEndTime.innerHTML += endTime;
    finalMoves.innerHTML += movesCount;
    // create a stars to print in the Modle
      for (i=0; i<=2; i++) {
        if (stars.children[i].children[0].style.color=='gold'){
            let li=document.createElement('li');
            li.innerHTML=stars.children[i].innerHTML;
            ulStarsRings.appendChild(li);
            ulStarsRings.children[i].style.display="inline-block";
            ulStarsRings.children[i].style.marginTop ="0px";
            ulStarsRings.children[i].style.marginBottom ="0px";
    }

  }


    refresh.addEventListener('click', function() {
        modal.style.display = "none";
        restStars();
        newGame();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    span.onclick = function() {
      modal.style.display = "none";
    }
}

function goldStars(){
  if (movesCount == 30){
      stars.children[2].children[0].style.color='black';
  }
  if (movesCount == 40) {
      stars.children[1].children[0].style.color='black';

  }
  if (movesCount == 45) {
      stars.children[0].children[0].style.color='black';

  }
}
//--------Timer------------
function add() {
seconds++;
if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }
}

timeElement.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

timer();
}
function timer() {
  currentTime = setTimeout(add, 1000);
}
//--------Timer------------

//restart button
restart.addEventListener('click',function() {
    endTime = minutes +':'+ seconds;
    clearTimeout(currentTime);
    restStars();
    newGame();
});

function restStars() {
          for (let i=0 ; i<ulStarsRings.children.length ; i++){
              ulStarsRings.children[i].remove();
          }
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
