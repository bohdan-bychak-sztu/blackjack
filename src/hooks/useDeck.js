import React from "react";
import {shuffle} from "../utils/GameUtil.js";

export default function useDeck(initialDeck = []){
    const [deck, setDeck] = React.useState([...initialDeck]);

    const shuffleDeck = () => {
        const shuffled = shuffle([...deck]);
        setDeck(shuffled);
    };

    const getCardFromDeck = (currentDeck) => {
        const card = currentDeck[0];
        setDeck(currentDeck.slice(1));
        return card;
    };

    return {deck, shuffleDeck, getCardFromDeck, setDeck};
}