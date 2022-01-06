//game variables
const deck = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11
]
let dealerHand
let playerHand
let playerHandValue
let dealerHandValue
let suits = ["♠", "♣", "♥", "♦"]
let ranks = ["A1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A11"]
let deckVisual = []
let index
let resetButton = document.querySelector("#reset-button")
let playerScore = 0
let dealerScore = 0
let gameOver = false
const hitButton = document.querySelector("#hit")
const newGameButton = document.querySelector("#new-game")
const standButton = document.querySelector("#stand")
const modalContainer = document.getElementById("modal")
const rulesButton = document.querySelector("#rules-button")
const rules = document.querySelector("#game-rules")

//function to hide start game button
function hideStart() {
newGameButton.style.display = "none"
}
hideStart()

//combines suits array with ranks array and creates new array called deckVisual
for(let i=0; i<4; i++) {
    for(let j=0; j<14; j++) {
        deckVisual.push(ranks[j] + suits[i])
    }
}

//function draws a random card from the deck array
function drawRandomCard(deck) {
    let randomIndex = Math.floor(deck.length * Math.random())
    return deck[randomIndex]
}

//function calculates the total of hand
function getHandValue(hand) {
    let sum = 0
    for(let i=0; i<hand.length; i++) {
        sum += hand[i] 
    }
    return sum
}

// function for player to hit.  adds new card to player hand and displays new value. If player busts, game over.
function hitMe() {
    playerHand.push(drawRandomCard(deck))
    if(getHandValue(playerHand) > 21) {
        document.querySelector("#hit").style.display = "none"
        document.querySelector("#stand").style.display = "none"
        document.getElementById("game-message").innerHTML = `Dealer wins! You busted! You have ${getHandValue(playerHand)} and the dealer has ${getHandValue(dealerHand)}.`
        document.getElementById("dealer-hand").innerText = `Dealer's new hand is: ${dealerHand}`
        document.getElementById("dealer-hand-value").innerText = `Value: ${getHandValue(dealerHand)}`
        modalContainer.classList.add("show")
        document.querySelector("#dealer-score").innerText = dealerScore += 1
        newGameButton.style.display = "inline"
    }
    document.getElementById("player-hand").innerText = `Your new hand is: ${playerHand}`
    document.getElementById("player-hand-value").innerText = `Value: ${getHandValue(playerHand)}`
}
//calls hitMe() when hit button is clicked
hitButton.addEventListener("click", () => {
    hitMe()
})

//event listener for stand button. compares values and makes dealer draw if handvalue < 17
standButton.addEventListener("click", () => {
    document.querySelector("#hit").style.display = "none"
    document.querySelector("#stand").style.display = "none"
    if(getHandValue(dealerHand) < 17) {
        for(let i=0; getHandValue(dealerHand)<17; i++) {
        dealerHand.push(drawRandomCard(deck))}
        }
    document.getElementById("dealer-hand").innerText = `Dealer's new hand is: ${dealerHand}`
    document.getElementById("dealer-hand-value").innerText = `Value: ${getHandValue(dealerHand)}`
    compareValues(getHandValue(dealerHand), getHandValue(playerHand))
    modalContainer.classList.add("show")
})

//function to compare values of each hand and display message
function compareValues(d, p) {
    if(d > 21) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `You win! Dealer BUSTS! You have ${getHandValue(playerHand)} and the dealer has ${getHandValue(dealerHand)}.`
        document.querySelector("#player-score").innerText = playerScore += 1
        newGameButton.style.display = "inline"
    }else if(d > p) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `Dealer wins! You have ${getHandValue(playerHand)} and the dealer has ${getHandValue(dealerHand)}.`
        document.querySelector("#dealer-score").innerText = dealerScore += 1
        newGameButton.style.display = "inline"
    }else if(d < p) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `You win! You have ${getHandValue(playerHand)} and the dealer has ${getHandValue(dealerHand)}.`
        document.querySelector("#player-score").innerText = playerScore += 1
        newGameButton.style.display = "inline"
    }else if(d === p) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `Push! You both have ${getHandValue(playerHand)}.`
        newGameButton.style.display = "inline"
    }
}

//function assigns two random cards from deck array to player and dealer
function startGame() {
    hideStart()
    playerHand = [drawRandomCard(deck), drawRandomCard(deck)]
    dealerHand = [drawRandomCard(deck), drawRandomCard(deck)]
    document.getElementById("player-hand").innerText = `Your hand is: ${playerHand}`
    document.getElementById("player-hand-value").innerText = `Value: ${getHandValue(playerHand)}`
    document.getElementById("dealer-hand").innerText = `Dealer's hand is: ?${dealerHand[1]}`
    document.getElementById("dealer-hand-value").innerText = `Value: ???`
    modalContainer.classList.remove("show")
}
startGame()

//event listener for new game button.
newGameButton.addEventListener("click", () => {
    startGame() 
    document.querySelector("#hit").style.display = "inline"
    document.querySelector("#stand").style.display = "inline"
    modalContainer.classList.remove("show")
})

//function and button to toggle the game rules
function toggleRules() {
        if(rules.style.display === "block") {
            rules.style.display = "none"
        }else{
            rules.style.display = "block"
        }
    }
rulesButton.addEventListener("click", () => {
    toggleRules()
})

//function to reset scores to 0 when reset button is pressed
resetButton.addEventListener("click", () => {
    playerScore = 0
    dealerScore = 0
    document.querySelector("#player-score").innerText = 0
    document.querySelector("#dealer-score").innerText = 0
})

