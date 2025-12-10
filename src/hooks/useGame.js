import { useState } from "react";
import { shuffle, calculatePoints } from "../utils/GameUtil.js";
import allCards from "../data/cards.js";

export default function useGame(initialState, deckCount = 1) {
    const [deck, setDeck] = useState(initialState);
    const [result, setResult] = useState(null);
    const [reveal, setReveal] = useState(false);

    const dealInitialCards = (playerHand, dealerHand) => {
        if (deck.length < 4) return;
        let currentDeck = [...deck];
        const playerCards = [currentDeck.shift(), currentDeck.shift()];
        const dealerCards = [currentDeck.shift(), currentDeck.shift()];
        setDeck(currentDeck);
        playerHand.setHand(playerCards);
        dealerHand.setHand(dealerCards);
    };

    const hit = (playerHand) => {
        const currentDeck = [...deck];
        const card = currentDeck.shift();
        setDeck(currentDeck);

        const newHand = [...playerHand.hand, card];
        playerHand.setHand(newHand);

        if (calculatePoints(newHand) > 21) {
            setReveal(true);
            setResult("lose");
        }
    };

    const stand = (playerHand, dealerHand) => {
        let currentDeck = [...deck];
        let currentDealerCards = [...dealerHand.hand];
        let dealerPoints = calculatePoints(currentDealerCards); // Важливо рахувати відразу

        setReveal(true);

        while (dealerPoints < 17) {
            const card = currentDeck.shift();
            currentDealerCards.push(card);
            dealerPoints = calculatePoints(currentDealerCards);
        }

        dealerHand.setHand(currentDealerCards);
        setDeck(currentDeck);

        const playerPoints = calculatePoints(playerHand.hand); // Рахуємо точно

        if (dealerPoints > 21 || playerPoints > dealerPoints) {
            setResult("win");
        } else if (dealerPoints === playerPoints) {
            setResult("push");
        } else {
            setResult("lose");
        }
    };

    const onReload = (playerHand, dealerHand) => {
        const newDeckRaw = Array(deckCount).fill(allCards).flat();
        setDeck(shuffle(newDeckRaw));
        playerHand.clearHand();
        dealerHand.clearHand();
        setResult(null);
        setReveal(false);
    }

    return {
        setDeck, setResult,
        deck, result, reveal,
        dealInitialCards, onReload, hit, stand
    };
}