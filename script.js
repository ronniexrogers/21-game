//Creating cards/numbers
// let suits = ["♠", "♣", "♥", "♦"]
// let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
// let deck = []

// for(let i=0; i<4; i++) {
//     for(let j=0; j<13; j++) {
//         deck.push(ranks[j] + suits[i])
//     }
// }
// console.log(deck)
const deck = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11
]

let dealerHand
let playerHand
let playerHandValue
let dealerHandValue
const hitButton = document.querySelector("#hit")
const newGameButton = document.querySelector("#new-game")
const standButton = document.querySelector("#stand")

function drawRandomCard(deck) {
    let randomIndex = Math.floor(deck.length * Math.random())
    return deck[randomIndex]
}

function startGame() {
    playerHand = [drawRandomCard(deck), drawRandomCard(deck)]
    dealerHand = [drawRandomCard(deck), drawRandomCard(deck)]
}
startGame()

function getHandValue(hand) {
    let sum = 0
    for(let i=0; i<hand.length; i++) {
        sum += hand[i] 
    }
    return sum
}

document.getElementById("player-hand").innerText = `Your hand is: ${playerHand}`
document.getElementById("player-hand-value").innerText = `Value: ${getHandValue(playerHand)}`
document.getElementById("dealer-hand").innerText = `Dealer's hand is: ?${dealerHand[1]}`
document.getElementById("dealer-hand-value").innerText = `Value: ???`

function hitMe() {
    playerHand.push(drawRandomCard(deck))
    console.log(`Your new hand is ${playerHand} with a value of ${getHandValue(playerHand)}.`)
    if(getHandValue(playerHand) > 21) {
        document.querySelector("#hit").style.display = "none"
        document.querySelector("#stand").style.display = "none"
        document.getElementById("game-message").innerText = `BUST!`
        document.getElementById("dealer-hand").innerText = `Dealer's new hand is: ${dealerHand}`
        document.getElementById("dealer-hand-value").innerText = `Value: ${getHandValue(dealerHand)}`
    }
    document.getElementById("player-hand").innerText = `Your new hand is: ${playerHand}`
    document.getElementById("player-hand-value").innerText = `Value: ${getHandValue(playerHand)}`
}

hitButton.addEventListener("click", () => {
    hitMe()
})

standButton.addEventListener("click", () => {
    document.querySelector("#hit").style.display = "none"
    document.querySelector("#stand").style.display = "none"
    if(getHandValue(dealerHand) < 17) {
        for(let i=0; getHandValue(dealerHand)<17; i++) {
        dealerHand.push(drawRandomCard(deck))}

    }else if(getHandValue(dealerHand) >= 17 && getHandValue(dealerHand) <= 21) {

    }else if(getHandValue(dealerHand) > 21) {
        document.getElementById("game-message").innerText = `Dealer BUSTS!`
    }
    document.getElementById("dealer-hand").innerText = `Dealer's new hand is: ${dealerHand}`
    document.getElementById("dealer-hand-value").innerText = `Value: ${getHandValue(dealerHand)}`
    compareValues(getHandValue(dealerHand), getHandValue(playerHand))
})

newGameButton.addEventListener("click", () => {
    window.location.reload()
    // startGame()
})

function compareValues(d, p) {
    if(d > 21) {
        document.getElementById("game-message").innerText = `Dealer BUSTS!`
    }else if(d > p) {
        document.getElementById("game-message").innerText = `Dealer wins!`
    }else if(d < p) {
        document.getElementById("game-message").innerText = `You win!`
    }else if(d === p) {
        document.getElementById("game-message").innerText = `Push!`
    }
}
