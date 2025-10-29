import React, {useEffect, useState} from "react";
import DealerHand from "../components/DealerHand/DealerHand.jsx";
import PlayerHand from "../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../components/GameControls/GameControls.jsx";
import allCards from "../data/cards.js";
import {calculatePoints, shuffle} from "../utils/GameUtil.js";
import Modal from "../components/Modal/Modal.jsx";
import ResultPage from "./ResultPage.jsx";


function GamePage() {
    const [deck, setDeck] = React.useState([...allCards]);
    const [playerCards, setPlayerCards] = React.useState([]);
    const [dealerCards, setDealerCards] = React.useState([]);
    const [isShuffled, setIsShuffled] = React.useState(false);
    const [reveal, setReveal] = React.useState(false);

    const [result, setResult] = useState(null);

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

    const getCardFromDeck = (currentDeck) => {
        const card = currentDeck[0];
        const newDeck = currentDeck.slice(1);
        return { card, newDeck };
    };

    const onReload = () => {
        const reshuffled = shuffle([...allCards]);
        setDeck(reshuffled);
        setPlayerCards([]);
        setDealerCards([]);
        setResult(null);
        setReveal(false);
        setIsShuffled(true);
    };

    const onHit = () => {
        const { card, newDeck } = getCardFromDeck(deck);
        setDeck(newDeck);

        const newPlayerCards = [...playerCards, card];
        setPlayerCards(newPlayerCards);

        if (calculatePoints(newPlayerCards) > 21) {
            setReveal(true);
            setResult("Bust! Dealer wins.");
        }
    };

    const onStand = () => {
        let currentDeck = [...deck];
        let currentDealerCards = [...dealerCards];
        let dealerPoints = calculatePoints(currentDealerCards);
        setReveal(true);

        while (dealerPoints < 17) {
            const card = currentDeck.shift();
            currentDealerCards.push(card);
            dealerPoints = calculatePoints(currentDealerCards);
        }

        setDealerCards(currentDealerCards);
        setDeck(currentDeck);

        const playerPoints = calculatePoints(playerCards);

        if (dealerPoints > 21 || playerPoints > dealerPoints) {
            setResult("You win!");
        } else if (playerPoints < dealerPoints) {
            setResult("Dealer wins!");
        } else{
            setResult("It's a tie!");
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
            <DealerHand cards={dealerCards} reveal={reveal}/>
            <PlayerHand name="Player" cards={playerCards}/>
            <GameControls onHit={onHit} onStand={onStand}/>
            <Modal isOpen={result} title="Result" onClose={() => {setResult(false); onReload();}}>
                <ResultPage result={result} onRestart={onReload}/>
            </Modal>
        </div>
    );
}

export default GamePage;