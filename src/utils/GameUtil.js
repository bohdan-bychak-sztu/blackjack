export function shuffle(array) {
    let i = array.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
    return array;
}

export function calculatePoints(cards) {
    let points = cards.reduce((total, card) => {
        let value = 0;
        if (['J', 'Q', 'K'].includes(card.value)) {
            value = 10;
        } else if (card.value === 'A') {
            value = 11;
        } else {
            value = parseInt(card.value);
        }
        return total + value;
    }, 0);

    let aces = cards.filter(card => card.value === 'A').length;

    while (points > 21 && aces > 0) {
        points -= 10;
        aces -= 1;
    }

    return points;
}

export const CHIPS_VALUES = [1, 5, 25, 100, 500];

export const calculateWinnings = (bet, result) => {
    if (result === 'win') return bet * 2;
    // Math.floor тут гарна ідея, щоб уникнути дробів
    if (result === 'blackjack') return Math.floor(bet * 2.5);
    if (result === 'push') return bet;
    return 0;
};