class AudioController {
  constructor() {
    this.bgMusic = new Audio(
      //   "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/creepy.mp3"
      "https://srv19.y2mate.is/download?file=217fd058ab3d705cb84ab625987bf476251003003&token=7nLAnZHRbwntRF20P0za3g&expires=1655633506555&s=qLCaMibhy7VUuLuoVkpWrA"
    );
    this.flipSound = new Audio(
      "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/flip.wav"
    );
    this.matchSound = new Audio(
      "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/match.wav"
    );
    this.victorySound = new Audio(
      "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/victory.wav"
    );
    this.gameOverSound = new Audio("Assets/Audio/gameOver.wav");
    this.bgMusic.volume = 0.4;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  victory() {
    this.stopMusic();
    this.victorySound.play();
  }
  gameOver() {
    this.stopMusic();
    this.gameOverSound.play();
  }
}

let audioController = new AudioController();
// cards Array
let cardsArray = [
  {
    name: "Bat",
    img: "images/Bat.png",
  },
  {
    name: "Bones",
    img: "images/Bones.png",
  },
  {
    name: "Cauldron",
    img: "images/Cauldron.png",
  },
  {
    name: "Dracula",
    img: "images/Dracula.png",
  },
  {
    name: "Skull",
    img: "images/Skull.png",
  },
  {
    name: "Pumpkin",
    img: "images/Pumpkin.png",
  },
  {
    name: "Bat",
    img: "images/Bat.png",
  },
  {
    name: "Bones",
    img: "images/Bones.png",
  },
  {
    name: "Cauldron",
    img: "images/Cauldron.png",
  },
  {
    name: "Dracula",
    img: "images/Dracula.png",
  },
  {
    name: "Skull",
    img: "images/Skull.png",
  },
  {
    name: "Pumpkin",
    img: "images/Pumpkin.png",
  },
];
cardsArray.sort(() => 0.5 - Math.random());
let frontCard;
let cardValue;
let displayGameGrid = document.getElementById("game-grid");
let displayScore = document.getElementById("score");
let displayFlips = document.getElementById("flips");
let cardsChosen = [];
let cardsIndex = [];
let cardsWon = [];
let clicked = 0;
let overlayText = Array.from(document.querySelectorAll(".overlay-text"));
function ready() {
  overlayText.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      audioController.startMusic();
      startGame();
      displayFlips.textContent = 0;
      clicked = 0;
      displayScore.textContent = 0;
      cardsWon.length = 0;
      displayScore.textContent = cardsWon.length;
    });
  });
}

function startGame() {
  let gameGridHtml = `<div class="row gx-2 gx-lg-3 gx-md-4 d-flex justify-content-center">`;
  for (let i = 0; i < cardsArray.length; i++) {
    gameGridHtml =
      gameGridHtml +
      `            <div class="col-3 col-lg-2 mt-2">
                    <div class="card w-100">
                      <div class="card-back card-face w-100" onClick="flipCard(${i})">
                        <img
                          class="cob-web cob-web-top-left"
                          src="images/Cobweb.png"
                        />
                        <img
                          class="cob-web cob-web-top-right"
                          src="images/Cobweb.png"
                        />
                        <img
                          class="cob-web cob-web-bottom-left"
                          src="images/Cobweb.png"
                        />
                        <img
                          class="cob-web cob-web-bottom-right"
                          src="images/Cobweb.png"
                          />
                          <img class="spider" src="images/Spider.png" />
                      </div>
                      <div class="card-front card-face w-100">
                        <img
                          class="cob-web cob-web-top-left"
                          src="images/CobwebGrey.png"
                        />
                        <img
                          class="cob-web cob-web-top-right"
                          src="images/CobwebGrey.png"
                        />
                        <img
                          class="cob-web cob-web-bottom-left"
                          src="images/CobwebGrey.png"
                        />
                        <img
                          class="cob-web cob-web-bottom-right"
                          src="images/CobwebGrey.png"
                        />
                        <img class="card-value w-75"/>
                      </div>
                    </div>
                  </div>
      `;
  }
  gameGridHtml = gameGridHtml + `</div>`;
  displayGameGrid.innerHTML = gameGridHtml;
  frontCard = document.querySelectorAll(".card");
}
function flipCard(i) {
  audioController.flip();
  clicked = clicked + 1;
  displayFlips.textContent = clicked;
  let cardsArrayIndex = i;
  cardValue = document.querySelectorAll(".card-value");
  cardValue[cardsArrayIndex].setAttribute(
    "src",
    cardsArray[cardsArrayIndex].img
  );
  frontCard[cardsArrayIndex].classList.add("visible");
  cardsChosen.push(cardsArray[cardsArrayIndex].img);
  cardsIndex.push(cardsArrayIndex);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}
function checkForMatch() {
  let optionTwo = cardsChosen[0];
  let optionOne = cardsChosen[1];
  let optionOneIndex = cardsIndex[0];
  let optionTwoIndex = cardsIndex[1];

  if (optionTwo === optionOne) {
    frontCard[optionOneIndex].classList.add("matched");
    frontCard[optionTwoIndex].classList.add("matched");
    cardsWon.push(cardsChosen);
    audioController.match();
  } else {
    frontCard[optionOneIndex].classList.remove("visible");
    frontCard[optionTwoIndex].classList.remove("visible");
  }
  cardsChosen = [];
  cardsIndex = [];
  displayScore.textContent = cardsWon.length;
  if (cardsWon.length === cardsArray.length / 2) {
    overlayText[2].classList.add("visible");
    audioController.victory();
  }
}
let seconds = 100;
let displayTimeRemaining = document.getElementById("time-remaining");
function timeDecrease() {
  seconds -= 1;
  displayTimeRemaining.textContent = seconds;
}

function renderGame() {
  ready();
  startGame();
}
renderGame();
let volumeOff = document.getElementById("volume-off");
let volumeOn = document.getElementById("volume-on");
volumeOff.style.display = "none";
function volumeOnOff() {
  volumeOff.style.display = "block";
  volumeOn.style.display = "none";
}
