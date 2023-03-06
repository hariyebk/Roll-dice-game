'use strict';
//
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let dicep = document.querySelector('.dice');
let roll = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let newgame = document.querySelector('.btn--new');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
//
score0.textContent = 0;
score1.textContent = 0;
dicep.classList.add('hidden');

//
let currentscore = 0;
let activeplayer = 0;
let score = [0, 0];
let isplaying = true;

const switchplayer = function () {
  document.querySelector(`#current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  currentscore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
const winchecker = function () {
  if (currentscore >= 30) {
    isplaying = false;
    dicep.classList.add('hidden');

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove('player--active');

    document.querySelector(`#name--${activeplayer}`).textContent = 'Winner';
    document.querySelector(`#score--${activeplayer}`).textContent = '🏆';
  }
};

roll.addEventListener('click', function () {
  if (isplaying) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    dicep.classList.remove('hidden');
    dicep.src = `dice-${dice}.png`;

    if (dice === 1) {
      document.querySelector(`#score--${activeplayer}`).textContent = 0;
      switchplayer();
    } else {
      currentscore += dice;
      winchecker();
      document.querySelector(`#current--${activeplayer}`).textContent =
        currentscore;
    }
  }
});

hold.addEventListener('click', function () {
  if (isplaying) {
    // 1. Add current score to active player's score
    score[activeplayer] += currentscore;
    // scores[1] = scores[1] + currentScore

    document.querySelector(`#score--${activeplayer}`).textContent =
      score[activeplayer];

    // 2. Check if player's score is >= 100
    if (score[activeplayer] >= 30) {
      // Finish the game
      isplaying = false;
      dicep.classList.add('hidden');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');

      document.querySelector(`#name--${activeplayer}`).textContent = 'Winner';
      document.querySelector(`#score--${activeplayer}`).textContent = '🏆';
    } else {
      switchplayer();
    }
  }
});

newgame.addEventListener('click', function () {
  isplaying = true;

  currentscore = 0;
  score = [0, 0];

  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove('player--winner');

  activeplayer == 0
    ? (document.querySelector(
        `#name--${activeplayer}`
      ).textContent = `player 1`)
    : (document.querySelector(
        `#name--${activeplayer}`
      ).textContent = `player 2`);

  document
    .querySelector(`.player--${activeplayer}`)
    .classList.add('player--active');

  document.querySelector(`#current--${activeplayer}`).textContent =
    currentscore;
  document.querySelector(`#score--0`).textContent = currentscore;
  document.querySelector(`#score--1`).textContent = currentscore;
  switchplayer();
});
