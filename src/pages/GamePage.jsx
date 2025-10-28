import React, {useEffect} from "react";
import DealerHand from "../components/DealerHand/DealerHand.jsx";
import PlayerHand from "../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../components/GameControls/GameControls.jsx";
import allCards from "../data/cards.js";

function shuffle(array) {
    let i = array.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
    return array;
}

function checkAceValue(cards) {
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


function GamePage() {
    const [deck, setDeck] = React.useState([...allCards]);
    const [playerCards, setPlayerCards] = React.useState([]);
    const [dealerCards, setDealerCards] = React.useState([]);
    const [isShuffled, setIsShuffled] = React.useState(false);

    const shuffleDeck = () => {
        const shuffled = shuffle([...deck]);
        setDeck(shuffled);
        setIsShuffled(true);
    };

    const dealInitialCards = () => {
        let currentDeck = [...deck];

        const playerCard1 = currentDeck.shift();
        const playerCard2 = currentDeck.shift();
        const dealerCard1 = currentDeck.shift();
        const dealerCard2 = currentDeck.shift();

        setDeck(currentDeck);
        setPlayerCards([playerCard1, playerCard2]);
        setDealerCards([dealerCard1, dealerCard2]);
    };

    const getCardFromDeck = () => {
        const card = deck[0];
        setDeck((prevDeck) => prevDeck.slice(1));
        return card;
    };

    const onHit = () => {
        const card = getCardFromDeck();
        setPlayerCards((prevCards) => [...prevCards, card]);
        if (checkAceValue([...playerCards, card]) > 21) {
            alert("Bust! You exceeded 21.");
        }
    }

    useEffect(() => {
        shuffleDeck();
    }, []);

    useEffect(() => {
        if (isShuffled) {
            dealInitialCards();
            setIsShuffled(false);
        }
    }, [isShuffled]);

    return (
        <div>
            <DealerHand cards={dealerCards}/>
            <PlayerHand name="Player" cards={playerCards}/>
            <GameControls onHit={onHit}/>
        </div>
    );
}

export default GamePage;