'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

let score, currentScore, activePlayer, playing;

// functions
const init = function () {
  // set initial value
  currentScore = 0;
  activePlayer = 0; //untuk menentukan player yang aktif
  score = [0, 0]; //untuk hasil akhir player
  playing = true;

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  // playing = true;
  // currentScore = 0;
  // activePlayer = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden'); //membuat dice hidden
  document.getElementById('name--1').textContent = 'Player 2';
  document.getElementById('name--0').textContent = 'Player 1';

  // document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
};
const getNumberDice = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

const swithPlayers = function () {
  // switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //cek player 0 atau 1
  currentScore = 0;

  player0El.classList.toggle('player--active'); //menghapus player aktif jika ada jika tidak ada di tambahkan
  player1El.classList.toggle('player--active'); //menghapus player aktif jika ada jika tidak ada di tambahkan
};

// initial game
init();

// btnRoll eventhandler
btnRoll.addEventListener('click', function () {
  // jika sedang bermain
  if (playing) {
    // 1. generate a random dice
    const dice = getNumberDice();

    // 2. display dice
    diceEl.classList.remove('hidden'); //menampilkan dice
    diceEl.src = `dice-${dice}.png`; //menampilkan dice sesuai random dice number

    // 3. check for rolled 1 if true.
    if (dice !== 1) {
      currentScore += dice; //menambahkan nilai current dari random dice number
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //agar bisa pilih player berdasarkan activeplayer
    } else {
      swithPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    score[activePlayer] += currentScore; //menambahkan curren score ke active player

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // switch jika menyimpan current score ke score

    // 2. check if player score is >= 100
    if (score[activePlayer] >= 20) {
      // finish game
      // agar permainan selesai
      playing = false;

      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(
        `#name--${activePlayer}`
      ).textContent = `player win`;
    } else {
      // switch to next player
      swithPlayers();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
