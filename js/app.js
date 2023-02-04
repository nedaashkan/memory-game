// music / sounds
class AudioController {
  constructor() {
    this.bgMusic = new Audio("audio/Assets_Audio_creepy.mp3");
    this.flipSound = new Audio("audio/Assets_Audio_flip.wav");
    this.matchSound = new Audio("audio/Assets_Audio_match.wav");
    this.victorySound = new Audio("audio/Assets_Audio_victory.wav");
    this.gameOverSound = new Audio("audio/Assets_Audio_gameOver.wav");
    this.bgMusic.volume = 0.5;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  victory() {
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
let overlayText = document.querySelectorAll(".overlay-text");
overlayText[0].addEventListener("click", displayOverlayTextStart);
function displayOverlayTextStart() {
  overlayText[0].classList.remove("visible");
}
function startGame() {
  let gameGridHtml = `<div class="row gx-2 gx-lg-3 gx-md-4 mt-lg-4 d-flex justify-content-center">`;
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
  }
}
function renderGame() {
  startGame();
}
renderGame();
