import React, {useEffect} from "react";
import PlayerHand from "../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../components/GameControls/GameControls.jsx";
import allCards from "../data/cards.js";
import Modal from "../components/Modal/Modal.jsx";
import ResultPage from "./ResultPage.jsx";
import useHand from "../hooks/useHand.js";
import usePlayerActions from "../hooks/usePlayerActions.js";
import useGame from "../hooks/useGame.js";
import useSettings from "../hooks/useSettings.js";
import usePlayers from "../hooks/usePlayers.js";
import {useLocation} from "react-router";


function GamePage() {
    const playerHand = useHand();
    const dealerHand = useHand();
    const {activePlayer} = usePlayers();
    const {userSettings, addUserSetting, changeUser} = useSettings(activePlayer() ? activePlayer().id.toString() : "default");
    const {deck, setDeck, result, setResult, reveal, setReveal, dealInitialCards, onReload} = useGame(Array(userSettings.deckNumber | 1).fill(allCards).flat());
    const {onHit, onStand} = usePlayerActions(deck, setDeck, playerHand, dealerHand, setReveal, setResult);
    const location = useLocation();


    const initializeDeck = () => {
        const numberOfDecks = userSettings.deckNumber || 1;
        const newDeck = Array(numberOfDecks).fill(allCards).flat();
        setDeck(newDeck);
    }

    useEffect(() => {
        if (location.state?.refresh && activePlayer) {
            const currentUser = activePlayer().id.toString();
            if (userSettings.id !== currentUser) {
                changeUser(currentUser);
            }
        }
    }, [location.state?.refresh, activePlayer, userSettings.id]);

    useEffect(() => {
        initializeDeck()
        dealInitialCards(playerHand, dealerHand);
    }, [location.state?.refresh]);

    useEffect(() => {
        console.log("Active Player:", activePlayer());
    }, [activePlayer]);

    return (
        <div>
            <div>В колоді залишилося {deck.length} карти</div>
            <PlayerHand name="Dealer" cards={dealerHand.hand} reveal={reveal} isDealer={true}/>
            <PlayerHand name="Player" cards={playerHand.hand}/>
            <GameControls onHit={onHit} onStand={onStand}/>
            <Modal isOpen={result} title="Result" onClose={() => {setResult(null); onReload(playerHand, dealerHand);}}>
                <ResultPage result={result} onRestart={() => {onReload(playerHand, dealerHand)}}/>
            </Modal>
        </div>
    );
}

export default GamePage;