export default function useChips() {
    const defaultChips = [1, 5, 25, 100, 500];


    const calculateWinnings = (bet, result) => {
        if (result === 'win') return bet * 2;
        if (result === 'blackjack') return Math.floor(bet * 2.5);
        if (result === 'push') return bet;
        return 0;
    };

    return { defaultChips, calculateWinnings };
}