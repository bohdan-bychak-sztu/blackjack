/**
 * @typedef {object} Card
 * @property {string} value - The value of the card (e.g., "2", "K", "A").
 * @property {string} suit - The suit of the card (e.g., "S", "H", "D", "C").
 */

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