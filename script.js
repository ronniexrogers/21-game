//game variables
const deck = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11
]
let dealerHand, playerHand, playerHandValue, dealerHandValue
let suits = ["♠", "♣", "♥", "♦"]
let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
let deckVisual = []
let resetButton = document.querySelector("#reset-button")
let playerScore = 0
let dealerScore = 0
let gameOver = false
let hasBlackJack = false
let isMuted = true
const hitButton = document.querySelector("#hit")
const newGameButton = document.querySelector("#new-game")
const standButton = document.querySelector("#stand")
const modalContainer = document.getElementById("modal")
const rulesButton = document.querySelector("#rules-button")
const rules = document.querySelector("#game-rules")
const closeRules = document.querySelector("#close-rules")
const bgMusic = document.querySelector("#bg-audio")
const winSound = document.querySelector("#win")
const loseSound = document.querySelector("#lose")

//function to hide start game button
function hideStart() {
newGameButton.style.display = "none"
}
hideStart()

function hideHitAndStand() {
    document.querySelector("#hit").style.display = "none"
    document.querySelector("#stand").style.display = "none"
}

//combines suits array with ranks array and creates new array called deckVisual
for(let i=0; i<4; i++) {
    for(let j=0; j<13; j++) {
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
        document.getElementById("dealer-hand").innerText = `Dealer's hand was: ${dealerHand}`
        document.getElementById("dealer-hand-value").innerText = `Value: ${getHandValue(dealerHand)}`
        modalContainer.classList.add("show")
        document.querySelector("#dealer-score").innerText = dealerScore += 1
        newGameButton.style.display = "inline"
        if(isMuted === false){loseSound.play()}
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
        if(isMuted === false){winSound.play()}
    }else if(d > p) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `Dealer wins! You have ${getHandValue(playerHand)} and the dealer has ${getHandValue(dealerHand)}.`
        document.querySelector("#dealer-score").innerText = dealerScore += 1
        newGameButton.style.display = "inline"
        if(isMuted === false){loseSound.play()}
    }else if(d < p) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `You win! You have ${getHandValue(playerHand)} and the dealer has ${getHandValue(dealerHand)}.`
        document.querySelector("#player-score").innerText = playerScore += 1
        newGameButton.style.display = "inline"
        if(isMuted === false){winSound.play()}
    }else if(d === p) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `Push! You both have ${getHandValue(playerHand)}.`
        newGameButton.style.display = "inline"
        if(isMuted === false){winSound.play()}
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
    if(getHandValue(playerHand) > 21) {
        startGame()
    }
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
function toggleRules(event) {
        if(rules.style.display === "block") {
            rules.style.display = "none"
            rulesButton.innerHTML = "Game Rules"
            rulesButton.style.padding = "5px"
        }else{
            rules.style.display = "block"
            rules.style.opacity = ".8"
            rulesButton.innerHTML = "Hide Rules"
            rulesButton.style.padding = "5px 10px 5px 10px"
    }
}
rulesButton.addEventListener("click", () => {
    toggleRules()
})

closeRules.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleRules()
})

//function to reset scores to 0 when reset button is pressed
resetButton.addEventListener("click", () => {
    playerScore = 0
    dealerScore = 0
    document.querySelector("#player-score").innerText = 0
    document.querySelector("#dealer-score").innerText = 0
})

//function to toggle background music
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play()
        bgMusic.loop = true
        document.querySelector("#bg-music-button").innerHTML = "🔈"
        isMuted = false
    }else{
        bgMusic.pause()
        document.querySelector("#bg-music-button").innerHTML = "🔇"
        isMuted = true
    }
}
document.querySelector("#bg-music-button").addEventListener("click", () => {
    toggleMusic()
})


