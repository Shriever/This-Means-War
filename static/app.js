// make deck of playing cards
let deck, playerOneDeck, playerTwoDeck;
const suits = ["S", "D", "H", "C"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

playerOneDeck = [];
playerTwoDeck = [];

// shuffle prototype taken from stack overflow https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
Object.defineProperty(Array.prototype, "shuffle", {
  value: function () {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
  },
});

deal();

function war() {
  // hide draw cards
  document.getElementById("card-one-down").style.display = "none";
  document.getElementById("card-two-down").style.display = "none";
  document.getElementById("card-one-up").style.display = "none";
  document.getElementById("card-two-up").style.display = "none";

  // pick a card from each players deck

  let cardOne = playerOneDeck[Math.floor(Math.random() * playerOneDeck.length)];
  let cardTwo = playerTwoDeck[Math.floor(Math.random() * playerTwoDeck.length)];

  // display corresponding img in html

  document.getElementById(
    "card-one"
  ).src = `../static/images/cards/${cardOne}.jpg`;
  document.getElementById(
    "card-two"
  ).src = `../static/images/cards/${cardTwo}.jpg`;

  // check which card value is greater

  // get card values
  oneValue = getCardValue(cardOne);
  twoValue = getCardValue(cardTwo);

  if (oneValue > twoValue) {
    // add card to p1 deck
    playerOneDeck.push(cardTwo);
    // remove card from p2 deck
    playerTwoDeck.splice(playerTwoDeck.indexOf(cardTwo), 1);
  } else if (twoValue > oneValue) {
    // add card to p2 deck
    playerTwoDeck.push(cardOne);
    // remove card from p1 deck
    playerOneDeck.splice(playerOneDeck.indexOf(cardOne), 1);
  } /* draw */ else {
    // keep track of cards to be won
    let cards = [cardOne, cardTwo];

    if (playerOneDeck.length > 2 && playerTwoDeck.length > 2) {
      // collect cards from players
      for (let i = 0; i < 2; i++) {
        // remove card from p1 deck
        playerOneDeck.splice(playerOneDeck.indexOf(cardOne), 1);
        // remove card from p2 deck
        playerTwoDeck.splice(playerTwoDeck.indexOf(cardTwo), 1);
        // get more cards from deck
        cardOne =
          playerOneDeck[Math.floor(Math.random() * playerOneDeck.length)];
        cardTwo =
          playerTwoDeck[Math.floor(Math.random() * playerTwoDeck.length)];
        // add to the pot
        cards.push(cardOne, cardTwo);
      }

      // reveal new cards in html
      document.getElementById("card-one-down").style.display = "block";
      document.getElementById("card-two-down").style.display = "block";
      document.getElementById("card-one-up").style.display = "block";
      document.getElementById("card-two-up").style.display = "block";
      document.getElementById(
        "card-one-up"
      ).src = `../static/images/cards/${cardOne}.jpg`;
      document.getElementById(
        "card-two-up"
      ).src = `../static/images/cards/${cardTwo}.jpg`;
    } else if (playerOneDeck.length < 2) {
      // add card to p2 deck
      playerTwoDeck.push(cardOne);

      // remove card from p1 deck
      playerOneDeck.splice(playerOneDeck.indexOf(cardOne), 1);

      // update card count in html
      updateCardCount();
      return;
    } else {
      // add card to p1 deck
      playerOneDeck.push(cardTwo);

      // remove card from p2 deck
      playerTwoDeck.splice(playerTwoDeck.indexOf(cardTwo), 1);

      // update card count in html
      updateCardCount();
      return;
    }

    oneValue = getCardValue(cardOne);
    twoValue = getCardValue(cardTwo);

    if (oneValue > twoValue) {
      playerOneDeck.splice(playerOneDeck.indexOf(cardOne), 1);
      // add cards to p1 deck
      for (let card of cards) {
        playerOneDeck.push(card);
      }
      // remove card from p2 deck
      playerTwoDeck.splice(playerTwoDeck.indexOf(cardTwo), 1);
    } else {
      playerTwoDeck.splice(playerTwoDeck.indexOf(cardTwo), 1);
      // add cards to p2 deck
      for (let card of cards) {
        playerTwoDeck.push(card);
      }
      // remove card from p1 deck
      playerOneDeck.splice(playerOneDeck.indexOf(cardOne), 1);
    }
  }

  updateCardCount();
}

function getCardValue(card) {
  return values.indexOf(card.charAt(0));
}

function endGame(winner) {
  document.getElementById("title").textContent = `Player ${winner} Wins!`;
}

function skip() {
  while (playerOneDeck.length > 0 && playerTwoDeck.length > 0) {
    war();
    if (playerOneDeck.length === 52) {
      // player one wins
      endGame(1);
    } else if (playerTwoDeck.length === 52) {
      // player two wins
      endGame(2);
    }
  }
}

// return a freshly shuffled deck
function initDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push(`${value}${suit}`);
    }
  }
  return deck.shuffle();
}

// deal the cards to the players
function deal() {
  playerOneDeck.splice(0, playerOneDeck.length);
  playerTwoDeck.splice(0, playerTwoDeck.length);

  deck = initDeck();

  for (let i = 0; i < 26; i++) {
    playerOneDeck.push(deck[i]);
  }
  for (let i = 26; i < 52; i++) {
    playerTwoDeck.push(deck[i]);
  }
  updateCardCount();
  resetCards();
  document.getElementById("title").textContent = "This Means War!";
}

function updateCardCount() {
  // update card count in html
  document.getElementById("score-1").textContent = playerOneDeck.length;
  document.getElementById("score-2").textContent = playerTwoDeck.length;
}

function resetCards() {
  document.getElementById("card-one-down").style.display = "none";
  document.getElementById("card-two-down").style.display = "none";
  document.getElementById("card-one-up").style.display = "none";
  document.getElementById("card-two-up").style.display = "none";
  document.getElementById("card-one").src = "../static/images/cards/AS.jpg";
  document.getElementById("card-two").src = "../static/images/cards/AS.jpg";
}

document.getElementById("war").addEventListener("click", war);

document.getElementById("skip").addEventListener("click", skip);

document.getElementById("new-game").addEventListener("click", deal);
