const suits = ["S", "H", "D", "C"]; // Spades, Hearts, Diamonds, Clubs
const values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "J", "Q", "K", "A"
];

const cards = [];

suits.forEach(suit => {
    values.forEach(value => {
        cards.push({value, suit});
    });
});

export default cards;