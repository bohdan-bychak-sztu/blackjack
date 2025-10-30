import React, {useEffect, useState} from "react";
import DealerHand from "../components/DealerHand/DealerHand.jsx";
import PlayerHand from "../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../components/GameControls/GameControls.jsx";
import allCards from "../data/cards.js";
import {calculatePoints, shuffle} from "../utils/GameUtil.js";
import Modal from "../components/Modal/Modal.jsx";
import ResultPage from "./ResultPage.jsx";
import useDeck from "../hooks/useDeck.js";
import useHand from "../hooks/useHand.js";


function GamePage() {
    const {deck, shuffleDeck, getCardFromDeck, setDeck} = useDeck(shuffle([...allCards]));
    const playerHand = useHand();
    const dealerHand = useHand();
    const [reveal, setReveal] = React.useState(false);

    const [result, setResult] = useState(null);


    const dealInitialCards = () => {
        let currentDeck = [...deck];

        const playerCard1 = currentDeck.shift();
        const playerCard2 = currentDeck.shift();
        const dealerCard1 = currentDeck.shift();
        const dealerCard2 = currentDeck.shift();

        setDeck(currentDeck);
        playerHand.setHand([playerCard1, playerCard2]);
        dealerHand.setHand([dealerCard1, dealerCard2]);
    };


    const onReload = () => {
        const reshuffled = shuffle([...allCards]);
        setDeck(reshuffled);
        playerHand.clearHand();
        dealerHand.clearHand();
        dealInitialCards();
        setResult(null);
        setReveal(false);
    };

    const onHit = () => {
        const card = getCardFromDeck(deck);

        const newPlayerCards = [...playerHand.hand, card];
        playerHand.setHand(newPlayerCards);

        if (calculatePoints(newPlayerCards) > 21) {
            setReveal(true);
            setResult("Bust! Dealer wins.");
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
        dealInitialCards();
    }, []);

    return (
        <div>
            <DealerHand cards={dealerHand.hand} reveal={reveal}/>
            <PlayerHand name="Player" cards={playerHand.hand}/>
            <GameControls onHit={onHit} onStand={onStand}/>
            <Modal isOpen={result} title="Result" onClose={() => {setResult(false); onReload();}}>
                <ResultPage result={result} onRestart={onReload}/>
            </Modal>
        </div>
    );
}

export default GamePage;