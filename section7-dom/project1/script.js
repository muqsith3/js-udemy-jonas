'use strict ';

// function
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

// generate random number 1-20
const getRandomNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

const changeBackground = function (backgroundColor) {
  document.querySelector('body').style.backgroundColor = backgroundColor;
};

let secretNumber = getRandomNumber();
// let secretNumber = Math.trunc(Math.random() * 20) + 1;
// console.info(secretNumber);

// membuat variabel score
let score = 20;
// membuat variabel highscore
let highscore = 0;

// handling click events  ketika check di click menselek button check!
document.querySelector('.check').addEventListener('click', function () {
  // menselek dan menampilkan vakue yang ada di input. disimpan ke dalam variabel guess
  const guess = Number(document.querySelector('.guess').value);

  // console.info(guess, typeof guess);
  // cek apakah ada input atau tidak, jika tidak ada tampilkan message.
  if (!guess) {
    // document.querySelector('.message').textContent = '⛔️ no Number!';
    displayMessage('⛔️ no Number!');
  }
  // ketika tebakan benar maka tampilkan message benar.
  else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 correct number!';
    displayMessage('🎉 correct number!');
    document.querySelector('.number').textContent = secretNumber;

    // merubah style
    // document.querySelector('body').style.backgroundColor = '#60b347';
    changeBackground('#60b347');
    document.querySelector('.number').style.width = '30rem';

    // implementasi highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    // cek apakah score di atas 0
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? '📈 too High!' : '📉 too Low!';
      displayMessage(guess > secretNumber ? '📈 too High!' : '📉 too Low!');
      score--;
      // document.querySelector('.score').textContent = score;
      displayScore(score);
    } else {
      // document.querySelector('.message').textContent = '💥 you lose the game';
      displayMessage('💥 you lose the game');
      // document.querySelector('.score').textContent = 0;
      displayScore(0);
    }
  }
  // // ketika salah terlalu besar
  // else if (guess > secretNumber) {
  // }
  // // ketika salah terlalu kecil
  // else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 too Low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥 you lose the game';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

// tombol reset
const reset = document.querySelector('.again');
reset.addEventListener('click', function () {
  // mengembalikan initial value
  secretNumber = getRandomNumber();
  score = 20;
  // document.querySelector('.message').textContent = 'start guessing';
  displayMessage('start guessing');
  document.querySelector('.number').textContent = '?';
  // document.querySelector('.score').textContent = score;
  displayScore(score);
  document.querySelector('.guess').value = '';
  // document.querySelector('body').style.backgroundColor = '#222';
  changeBackground('#222');
  document.querySelector('.number').style.width = '15rem';
});
