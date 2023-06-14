const wordDisplay = document.querySelector(".word-display");
const wordInputEl = document.querySelector(".word-input");

const scoreEl = document.querySelector(".score");
const timerEl = document.querySelector(".time");
const btnEl = document.querySelector(".button");
const TIME_OUT = 5;
let cleanInterval;
let time = TIME_OUT;
let count = 0;
let game_bool = false;
let words = [];
let timerInterval;
init();

function init() {
  displayText("게임로딩중");
  getWords();

  wordInputEl.addEventListener("input", checkMatch);
}

// 단어 불러오기
function getWords() {
  axios
    .get("https://random-word-api.herokuapp.com/word?number=100")
    .then(function (response) {
      // handle success

      response.data.forEach(word => {
        if (word.length < 10) {
          words.push(word);
        }
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  displayText("게임시작");
}

function checkSum() {
  if (!game_bool && time === 0) {
    displayText("게임시작");
    clearInterval(clearInterval);
  }
}

// 게임실행
function checkRun() {
  game_bool = true;
  time = TIME_OUT;
  timer();
  wordInputEl.focus();
  scoreEl.innerText = 0;

  timerInterval = setInterval(timer, 1000);
  cleanInterval = setInterval(checkSum, 50);
  displayText("게임중");
}

displayText("게임시작");
function displayText(text) {
  btnEl.innerText = text;
  text === "게임시작"
    ? btnEl.classList.remove("loading")
    : btnEl.classList.add("loading");
}

checkRun();

// 타이머 감소
function timer() {
  time > 0 ? time-- : (game_bool = false);
  timerEl.innerText = time;
  if (!game_bool) {
    clearInterval(timerInterval);
  }
  timerEl.innerText = time;
}
// 단어 일치체크
function checkMatch() {
  if (wordInputEl.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInputEl.value = "";
    if (!game_bool) {
      return;
    }
    count++;
    scoreEl.innerText = count;

    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
  }
}
