"use strict"

//активация кнопки старт при нажатии
const BUTTON_START = document.querySelector('.button-start');
BUTTON_START.onclick = function () {
   document.querySelector('.start-menu').classList.add('activated');
   BUTTON_START.classList.add('activated');
   if (BUTTON_START.classList.contains('activated')) {

      game();
   }
}

//перезапуск при нажатии кнопки рестарт
const BUTTON_RESTART = document.querySelector('.img-restart');
BUTTON_RESTART.onclick = function () {
   BUTTON_RESTART.classList.add('activated');
   if (BUTTON_RESTART.classList.contains('activated')) {
      game();
      console.log('рестарт');

   }
}

function game() {

   //линия времени 

   function getId(id) {
      return document.getElementById(id);
   }

   startDeadeLine();
   function startDeadeLine() {

      let deadeLine = getId("deadeLine");
      deadeLine.style = "animation: deadeLine 60s linear";
   }
   function showMessage() {
      alert("YOU LOSE");
   }
   deadeLine.addEventListener("animationend", showMessage);




   function createBorder() {
      for (let i = 0; i < cardsArr.length; i++) {
         const imgCard = document.createElement('IMG');
         imgCard.setAttribute('id', String(i));
         imgCard.setAttribute('src', 'page-for-memory/pages/thirdGame-images/img/0.jpg')
         imgCard.addEventListener('click', flipCard);
         cardsDiv.appendChild(imgCard);
      }
   }

   let cardsChosenArr = [];
   let cardsChosenArrId = [];
   let nofOpenedCardsArr = [];


   const cards = document.querySelectorAll('.memory-card');

   let hasFlippedCard = false;
   let lockBoard = false;
   let firstCard, secondCard;
   let victoryTab = document.querySelector('.textVictory');

   //звук
   let audio = new Audio('/page-for-memory/sound/successfull.mp3');


   function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add('flip');

      if (!hasFlippedCard) {
         hasFlippedCard = true;
         firstCard = this;
         return;
      }

      secondCard = this;
      hasFlippedCard = false;

      checkForMatch();



   }
   //добавляет счёт для открытых карт
   let score = 0;
   document.getElementById("scoreOpenedCards").innerHTML = score;

   function checkForMatch() {
      if (firstCard.dataset.framework === secondCard.dataset.framework) {

         document.getElementById("scoreOpenedCards").innerHTML = score += 1;
         audio.play();

         //анимация победы 
         if (score == 9) {
            victoryTab.style = 'visibility:visible;';
         }
         disableCards();
         return;
      }

      unflipCards();
   }




   function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetBoard();
   }

   function unflipCards() {
      lockBoard = true;

      setTimeout(() => {
         firstCard.classList.remove('flip');
         secondCard.classList.remove('flip');

         lockBoard = false;
         resetBoard();
      }, 1500);
   }

   function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
   }

   function shuffle() {
      cards.forEach(card => {
         let ramdomPos = Math.floor(Math.random() * 18);
         card.style.order = ramdomPos;
      });
   }

   shuffle();
   cards.forEach(card => card.addEventListener('click', flipCard));
}