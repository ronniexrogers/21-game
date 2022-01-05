Creating cards/numbers
let suits = ["♠", "♣", "♥", "♦"]
let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
let deck = []

for(let i=0; i<4; i++) {
    for(let j=0; j<13; j++) {
        deck.push(ranks[j] + suits[i])
    }
}
console.log(deck)






//Creating logic establishing rules
// function getScore(cards) {
//     let score = 0
//     for (let i=0; i<cards.length; i++) {
        
//     }
// }