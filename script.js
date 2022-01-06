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
const hitButton = document.querySelector("#hit")
const newGameButton = document.querySelector("#new-game")
const standButton = document.querySelector("#stand")
const modalContainer = document.getElementById("modal")
const rulesButton = document.querySelector("#rules")
const rules = document.querySelector("#game-rules")



//combines suits array with ranks array and creates new array called deckVisual
for(let i=0; i<4; i++) {
    for(let j=0; j<14; j++) {
        deckVisual.push(ranks[j] + suits[i])
    }
}

console.log(deckVisual)
console.log(deck)

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

//Text to display when page loads

console.log()

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
    }else if(d > p) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `Dealer wins! You have ${getHandValue(playerHand)} and the dealer has ${getHandValue(dealerHand)}.`
    }else if(d < p) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `You win! You have ${getHandValue(playerHand)} and the dealer has ${getHandValue(dealerHand)}.`
    }else if(d === p) {
        modalContainer.classList.add("show")
        document.getElementById("game-message").innerText = `Push! You both have ${getHandValue(playerHand)}.`
    }
}

//function assigns two random cards from deck array to player and dealer
function startGame() {
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
    // window.location.reload()
    startGame() 
    document.querySelector("#hit").style.display = "inline"
    document.querySelector("#stand").style.display = "inline"
    modalContainer.classList.remove("show")
})

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











//ignoring for now
// //assigning # to Spades
// for(let i=0; i<=9; i++) {
//     numericDeck[i] = (i + 1)
//     numericDeck.push(deck[i])
// }
// for(let i=10; i<=12; i++) {
//     numericDeck[i] = 10
// }
// numericDeck[13] = 11

// //assigning # to clubs
// for(let i=14; i<=23; i++) {
//     deck[i] = (i + 1)
// }

// for(let i=24; i<=26; i++) {
//     deck[i] = 10
// }
// deck[27] = 11

// //assigning # to hearts
// for(let i=28; i<=37; i++) {
//     deck[i] = (i + 1)
// }

// for(let i=38; i<=40; i++) {
//     deck[i] = 10
// }
// deck[27] = 41

// //assigning # to diamonds
// for(let i=41; i<=51; i++) {
//     deck[i] = (i + 1)
// }

// for(let i=52; i<=54; i++) {
//     deck[i] = 10
// }
// deck[55] = 11

// console.log(deck)
// console.log(numericDeck)
