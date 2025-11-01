import React, {useContext, useEffect} from "react";
import PlayerHand from "../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../components/GameControls/GameControls.jsx";
import allCards from "../data/cards.js";
import Modal from "../components/Modal/Modal.jsx";
import ResultPage from "./ResultPage.jsx";
import useHand from "../hooks/useHand.js";
import usePlayerActions from "../hooks/usePlayerActions.js";
import useGame from "../hooks/useGame.js";
import AppContext from "../contexts/AppContext.js";
import {shuffle} from "../utils/GameUtil.js";


function GamePage() {
    const {players, settings} = useContext(AppContext);
    const numberOfDecks = settings.userSettings.deckNumber | 1;

    const playerHand = useHand();
    const dealerHand = useHand();
    const {
        deck,
        setDeck,
        result,
        setResult,
        reveal,
        setReveal,
        dealInitialCards,
        onReload
    } = useGame([]);

    const {onHit, onStand} = usePlayerActions(deck, setDeck, playerHand, dealerHand, setReveal, setResult);

    console.log('number of cards:', deck.length);

    const initializeDeck = () => {
        const newDeck = Array(numberOfDecks).fill(allCards).flat();
        setDeck(shuffle(newDeck));
    }

    useEffect(() => {
        initializeDeck()
    }, [numberOfDecks]);

    useEffect(() => {
        if ((deck.length > 0 && playerHand.hand.length === 0) || deck.length === allCards.length * numberOfDecks) {
            dealInitialCards(playerHand, dealerHand);
        }
    }, [deck]);

    useEffect(() => {
        console.log(settings.userSettings)
    }, [players.activePlayer]);

    return (
        <div>
            <div>Current player: {settings.userSettings.name}</div>
            <div>В колоді залишилося {deck.length} карти</div>
            <PlayerHand name="Dealer" cards={dealerHand.hand} reveal={reveal} isDealer={true}/>
            <PlayerHand name="Player" cards={playerHand.hand}/>
            <GameControls onHit={onHit} onStand={onStand}/>
            <Modal isOpen={result} title="Result" onClose={() => {
                setResult(null);
                onReload(playerHand, dealerHand);
            }}>
                <ResultPage result={result} onRestart={() => {
                    onReload(playerHand, dealerHand)
                }}/>
            </Modal>
        </div>
    );
}

export default GamePage;