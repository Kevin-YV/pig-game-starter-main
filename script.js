'use strict';
const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.querySelector('#score--1');
//const scorePlayer1 = document.getElementById('score--1');
const diceHidden = document.querySelector('.dice');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const currentPlayer0 = document.querySelector('#current--0');
const currentPlayer1 = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const title = document.querySelector('.name');

const text = document.createElement('p');

scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
diceHidden.classList.add('hidden');
// Cache le dé

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

btnRoll.addEventListener('click', () => {
  const dice = Math.trunc(Math.random() * 6) + 1;
  // Sort un dé de 1 à 6

  diceHidden.classList.remove('hidden');
  // Montre le dé
  diceHidden.src = `dice-${dice}.png`;
  // Change l'affichage du dé

  if (dice !== 1) {
    currentScore += dice;
    // Ajoute le score du dé obtenu au score du joueur
    /*currentPlayer0.textContent = currentScore;*/
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    // Récupère le score du html et change la valeur par la face du dé obtenu et ajoute le dans son score
  } else {
    swicthPlayer(); // Change de joueur si le dé est un 1
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // si le joueur joue = true
    scores[activePlayer] += currentScore;
    // Ajoute le score du joueur a son score
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Récupère la valeur score du html des joueurs et met le score obtenu du joueur dans son current
  }
  if (scores[activePlayer] >= 20) {
    playing = false;
    // Si un des joueurs arrive à 20 ou > à 20 on arrete de jouer
    //document.querySelector(`#name--${activePlayer}`).textContent = 'Winner !';
    // Récupère la valeur nom des joueurs du html et affiche quel joueur à gagner
    diceHidden.classList.add('hidden');
    // Recache le dé
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    // Cache toute les valeurs du joueurs qui à gagner
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    // Remplace et affiche les valeurs du joueur qui à gagner
  } else {
    swicthPlayer();
  }
});

btnNew.addEventListener('click', () => {
  init();
});

function swicthPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentPlayer0.textContent = 0;
  currentPlayer1.textContent = 0;

  diceHidden.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}
