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
dealerHandValue = getHandValue(dealerHand)
playerHandValue = getHandValue(playerHand)



console.log(`Dealers hand is ${dealerHand} with a value of: ${dealerHandValue}. And your hand is ${playerHand} with a value of ${playerHandValue}.`)



