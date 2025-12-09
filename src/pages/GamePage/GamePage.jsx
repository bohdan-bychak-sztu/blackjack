import React, {useContext, useEffect, useState} from "react";
import Confetti from "react-confetti";
import PlayerHand from "../../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../../components/GameControls/GameControls.jsx";
import allCards from "../../data/cards.js";
import Modal from "../../components/Modal/Modal.jsx";
import ResultPage from "../ResultPage.jsx";
import useHand from "../../hooks/useHand.js";
import usePlayerActions from "../../hooks/usePlayerActions.js";
import useGame from "../../hooks/useGame.js";
import AppContext from "../../contexts/AppContext.js";
import {shuffle} from "../../utils/GameUtil.js";
import useChips from "../../hooks/useChips.js";
import ChipsControl from "../../components/ChipsControl/ChipsControl.jsx";
import useBalance from "../../hooks/useBalance.js";
import styles from './GamePage.module.css';
import loseSound from "../../assets/sounds/lose.mp3";
import winSoundFile from "../../assets/sounds/win.mp3";
import blackjackSound from "../../assets/sounds/blackjack.mp3";
import useSound from "../../hooks/useSound.js";
import {useTranslation} from "react-i18next";

function GamePage() {
    const { t } = useTranslation();
    const {players, settings} = useContext(AppContext);
    const numberOfDecks = settings.userSettings.deckNumber | 1;
    const [isAnimating, setIsAnimating] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [currentBet, setCurrentBet] = useState(0);
    const {balance, updateBalance} = useBalance();
    const [isBetPlaced, setIsBetPlaced] = useState(false);
    const {calculateWinnings} = useChips();
    const winSound = useSound(winSoundFile, false);


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

    const handleBet = (amount) => {
        setCurrentBet(prev => prev + amount);
        updateBalance(-amount);
    };

    const confirmBet = () => {
        if (currentBet > 0) {
            setIsBetPlaced(true);
            dealInitialCards(playerHand, dealerHand);
        }
    }

    useEffect(() => {
        console.log(result)
        if (result) {
            const winnings = calculateWinnings(currentBet, result);
            updateBalance(winnings);
            setCurrentBet(0);
            setIsBetPlaced(false);
        }
    }, [result]);

    const initializeDeck = () => {
        const newDeck = Array(numberOfDecks).fill(allCards).flat();
        setDeck(shuffle(newDeck));
    }

    useEffect(() => {
        initializeDeck()
    }, [numberOfDecks]);

    /*useEffect(() => {
        if ((deck.length > 0 && playerHand.hand.length === 0) || deck.length === allCards.length * numberOfDecks) {
            dealInitialCards(playerHand, dealerHand);
        }
    }, [deck]);*/

    useEffect(() => {
        if (result) {
            let sound;
            if (result === "win") {
                sound = winSound;
            } else if (result === "lose") {
                sound = new Audio(loseSound);
            } else if (result === "blackjack") {
                sound = new Audio(blackjackSound);
            }

            if (sound) {
                sound.play();
            }

            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
                setShowModal(true);
            }, 2000);
        }
    }, [result]);

    useEffect(() => {
        console.log(settings.userSettings)
    }, [players.activePlayer]);

    useEffect(() => {
        if (result) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
                setShowModal(true);
            }, 2000);
        }
    }, [result]);

    return (
        <div className={`${styles.gamePage} ${isAnimating ? styles.animateEnd : ''}`}>
            {(result === "win" || result === "blackjack") && <Confetti/>}
            <div>{t("currentPlayer")}: {settings.userSettings.name}</div>
            <div>{deck.length} {t("cardsLeft")}</div>
            <PlayerHand name="Dealer" cards={dealerHand.hand} reveal={reveal} isDealer={true}/>
            <PlayerHand name="Player" cards={playerHand.hand}/>
            <ChipsControl
                balance={balance}
                currentBet={currentBet}
                onBet={handleBet}
                isBetPlaced={isBetPlaced}
            />
            {!isBetPlaced && (
                <button onClick={confirmBet} disabled={currentBet === 0}>
                    {t("placeBet")}
                </button>
            )}
            {isBetPlaced ? <GameControls onHit={onHit} onStand={onStand}/> : null}
            <Modal isOpen={showModal} title="Result" onClose={() => {
                setShowModal(false);
                setResult(null);
                onReload(playerHand, dealerHand);
            }}>
                <ResultPage result={result} onRestart={() => {
                    setShowModal(false);
                    setResult(null);
                    onReload(playerHand, dealerHand)
                }}/>
            </Modal>
        </div>
    );
}

export default GamePage;