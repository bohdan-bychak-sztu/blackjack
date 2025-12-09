import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import PlayerHand from "../../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../../components/GameControls/GameControls.jsx";
import allCards from "../../data/cards.js";
import Modal from "../../components/Modal/Modal.jsx";
import ResultPage from "../ResultPage.jsx";
import useHand from "../../hooks/useHand.js";
import usePlayerActions from "../../hooks/usePlayerActions.js";
import useGame from "../../hooks/useGame.js";
import {calculateWinnings, shuffle} from "../../utils/GameUtil.js";
import ChipsControl from "../../components/ChipsControl/ChipsControl.jsx";
import styles from './GamePage.module.css';
import loseSoundFile from "../../assets/sounds/lose.mp3";
import winSoundFile from "../../assets/sounds/win.mp3";
import blackjackSoundFile from "../../assets/sounds/blackjack.mp3";
import useSound from "../../hooks/useSound.js";
import { useTranslation } from "react-i18next";
import usePlayerStore from "../../store/playerStore.js";

function GamePage() {
    const { t } = useTranslation();

    const activePlayerId = usePlayerStore((state) => state.activePlayerId);

    const player = usePlayerStore((state) => state.players[activePlayerId]);
    const settings = usePlayerStore((state) => state.settings[activePlayerId]);

    const updatePlayerBalance = usePlayerStore((state) => state.updatePlayerBalance);
    const registerGameResult = usePlayerStore((state) => state.registerGameResult);

    const numberOfDecks = settings?.deckNumber || 1;
    const playerName = settings?.name || "Player";
    const currentBalance = player?.balance || 0;

    const [isAnimating, setIsAnimating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentBet, setCurrentBet] = useState(0);
    const [isBetPlaced, setIsBetPlaced] = useState(false);

    const winSound = useSound(winSoundFile);
    const loseSound = useSound(loseSoundFile);
    const blackjackSound = useSound(blackjackSoundFile);

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
    } = useGame([], numberOfDecks);

    const { onHit, onStand } = usePlayerActions(deck, setDeck, playerHand, dealerHand, setReveal, setResult);

    const handleBet = (amount) => {
        // Перевірка, щоб не піти в мінус
        if (currentBalance - amount < 0) return;

        setCurrentBet((prev) => prev + amount);
        updatePlayerBalance(activePlayerId, currentBalance - amount);
    };

    const confirmBet = () => {
        if (currentBet > 0) {
            setIsBetPlaced(true);
            dealInitialCards(playerHand, dealerHand);
        }
    };

    useEffect(() => {
        const newDeck = Array(numberOfDecks).fill(allCards).flat();
        setDeck(shuffle(newDeck));
    }, [numberOfDecks, setDeck]);

    useEffect(() => {
        if (result) {
            const winnings = calculateWinnings(currentBet, result);
            if (winnings > 0) {
                updatePlayerBalance(activePlayerId, player?.balance + winnings);
            }

            if (activePlayerId) {
                registerGameResult(activePlayerId, result);
            }

            if (result === "win") winSound.play();
            else if (result === "lose") loseSound.play();
            else if (result === "blackjack") blackjackSound.play();

            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setShowModal(true);
            }, 2000);

            setCurrentBet(0);
            setIsBetPlaced(false);

            return () => clearTimeout(timer);
        }
    }, [result]);

    return (
        <div className={`${styles.gamePage} ${isAnimating ? styles.animateEnd : ''}`}>
            {(result === "win" || result === "blackjack") && <Confetti />}

            <div>{t("currentPlayer")}: {playerName}</div>
            <div>{deck.length} {t("cardsLeft")}</div>

            <PlayerHand name="Dealer" cards={dealerHand.hand} reveal={reveal} isDealer={true} />
            <PlayerHand name="Player" cards={playerHand.hand} />

            <ChipsControl
                balance={currentBalance}
                currentBet={currentBet}
                onBet={handleBet}
                isBetPlaced={isBetPlaced}
            />

            {!isBetPlaced && (
                <>
                    <button onClick={confirmBet} disabled={currentBet === 0}>
                        {t("placeBet")}
                    </button>

                    {currentBalance < 10 && currentBet === 0 && (
                        <button
                            className={styles.resetButton}
                            onClick={() => updatePlayerBalance(activePlayerId, 1000)}
                        >
                            {t("resetBalance")} ($1000)
                        </button>
                    )}
                </>
            )}

            {isBetPlaced ? <GameControls onHit={onHit} onStand={onStand} disabled={result !== null} /> : null}

            <Modal isOpen={showModal} title="Result" onClose={() => {
                setShowModal(false);
                setResult(null);
                onReload(playerHand, dealerHand);
            }}>
                <ResultPage result={result} onRestart={() => {
                    setShowModal(false);
                    setResult(null);
                    onReload(playerHand, dealerHand);
                }} />
            </Modal>
        </div>
    );
}

export default GamePage;