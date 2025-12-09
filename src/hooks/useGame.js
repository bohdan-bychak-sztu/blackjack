import { useState } from "react";
import { shuffle } from "../utils/GameUtil.js";
import allCards from "../data/cards.js";

export default function useGame(initialState, deckCount = 1) {
    const [deck, setDeck] = useState(initialState);
    const [result, setResult] = useState(null);
    const [reveal, setReveal] = useState(false);

    const dealInitialCards = (playerHand, dealerHand) => {
        if (deck.length < 4) {
            return;
        }

        let currentDeck = [...deck];

        const playerCards = [currentDeck.shift(), currentDeck.shift()];
        const dealerCards = [currentDeck.shift(), currentDeck.shift()];

        setDeck(currentDeck);
        playerHand.setHand(playerCards);
        dealerHand.setHand(dealerCards);
    };

    const onReload = (playerHand, dealerHand) => {
        const newDeckRaw = Array(deckCount).fill(allCards).flat();
        const reshuffled = shuffle(newDeckRaw);

        setDeck(reshuffled);
        playerHand.clearHand();
        dealerHand.clearHand();
        setResult(null);
        setReveal(false);
    }

    return { deck, setDeck, result, setResult, reveal, setReveal, dealInitialCards, onReload };
}