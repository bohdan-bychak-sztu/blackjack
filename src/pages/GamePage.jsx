import React, {useEffect} from "react";
import DealerHand from "../components/DealerHand/DealerHand.jsx";
import PlayerHand from "../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../components/GameControls/GameControls.jsx";
import allCards from "../data/cards.js";
import {calculatePoints, shuffle} from "../utils/GameUtil.js";


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
        console.log(card);
        setPlayerCards((prevCards) => [...prevCards, card]);
        if (calculatePoints([...playerCards, card]) > 21) {
            alert("Bust! You exceeded 21.");
        }
    }

    const onStand = () => {
        let currentDealerCards = [...dealerCards];
        let dealerPoints = calculatePoints(currentDealerCards);

        while (dealerPoints < 17) {
            const card = getCardFromDeck();
            currentDealerCards.push(card);
            dealerPoints = calculatePoints(currentDealerCards);
        }

        setDealerCards(currentDealerCards);

        const playerPoints = calculatePoints(playerCards);

        if (dealerPoints > 21 || playerPoints > dealerPoints) {
            alert("You win!");
        } else if (playerPoints < dealerPoints) {
            alert("Dealer wins!");
        } else {
            alert("It's a tie!");
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
            <GameControls onHit={onHit} onStand={onStand}/>
        </div>
    );
}

export default GamePage;