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
console.log(`Your hand is ${playerHand} with a value of ${getHandValue(playerHand)}.`)

hitButton.addEventListener("click", () => {
    playerHand.push(drawRandomCard(deck))
    console.log(`Your new hand is ${playerHand} with a value of ${getHandValue(playerHand)}.`)
    if(getHandValue(playerHand) > 21) {
        console.log("Bust!")
    }
})







