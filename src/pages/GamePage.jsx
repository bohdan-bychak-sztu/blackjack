import React, {useEffect} from "react";
import PlayerHand from "../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../components/GameControls/GameControls.jsx";
import allCards from "../data/cards.js";
import Modal from "../components/Modal/Modal.jsx";
import ResultPage from "./ResultPage.jsx";
import useHand from "../hooks/useHand.js";
import usePlayerActions from "../hooks/usePlayerActions.js";
import useGame from "../hooks/useGame.js";


function GamePage() {
    const playerHand = useHand();
    const dealerHand = useHand();
    const {deck, setDeck, result, setResult, reveal, setReveal, dealInitialCards, onReload} = useGame(allCards);
    const {onHit, onStand} = usePlayerActions(deck, setDeck, playerHand, dealerHand, setReveal, setResult);


    useEffect(() => {
        dealInitialCards(playerHand, dealerHand);
    }, []);

    return (
        <div>
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