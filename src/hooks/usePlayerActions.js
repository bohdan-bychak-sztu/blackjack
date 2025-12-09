import {calculatePoints} from "../utils/GameUtil.js";

export default function usePlayerActions(deck, setDeck, playerHand, dealerHand, setReveal, setResult) {
    const onHit = () => {
        const card = deck[0];
        setDeck(deck.slice(1));
        const currentPlayerCards = [...playerHand.hand, card];
        playerHand.setHand(currentPlayerCards);

        if (calculatePoints(currentPlayerCards) > 21) {
            setReveal(true);
            setResult("lose");
        }
    };

    const onStand = () => {
        let currentDeck = [...deck];
        let currentDealerCards = [...dealerHand.hand];
        let dealerPoints = dealerHand.points;
        setReveal(true);

        while (dealerPoints < 17) {
            const card = currentDeck.shift();
            currentDealerCards.push(card);
            dealerPoints = calculatePoints(currentDealerCards);
        }

        dealerHand.setHand(currentDealerCards);
        setDeck(currentDeck);

        const playerPoints = playerHand.points;

        if (playerPoints === 21 && playerPoints > dealerPoints) {
            setResult("blackjack");
        } else if (dealerPoints > 21 || playerPoints > dealerPoints) {
            setResult("win");
        } else if (dealerPoints === playerPoints) {
            setResult("push");
        }
        else {
            setResult("lose");
        }

    }

    return { onHit, onStand };
}