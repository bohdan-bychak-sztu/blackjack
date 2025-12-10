import React, {useEffect, useState} from "react";
import Confetti from "react-confetti";
import PlayerHand from "../../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../../components/GameControls/GameControls.jsx";
import allCards from "../../data/cards.js";
import Modal from "../../components/Modal/Modal.jsx";
import ResultPage from "../ResultPage.jsx";
import useHand from "../../hooks/useHand.js";
import useGame from "../../hooks/useGame.js";
import {calculateWinnings, shuffle} from "../../utils/GameUtil.js";
import ChipsControl from "../../components/ChipsControl/ChipsControl.jsx";
import styles from './GamePage.module.css';
import loseSoundFile from "../../assets/sounds/lose.mp3";
import winSoundFile from "../../assets/sounds/win.mp3";
import blackjackSoundFile from "../../assets/sounds/blackjack.mp3";
import useSound from "../../hooks/useSound.js";
import {useTranslation} from "react-i18next";
import usePlayerStore from "../../store/playerStore.js"; // Переконайтеся, що шлях правильний

function GamePage() {
    const {t} = useTranslation();

    const activePlayerId = usePlayerStore((state) => state.activePlayerId);
    const player = usePlayerStore((state) => state.players[activePlayerId]);
    const actualBalance = player?.balance || 0;
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
        dealInitialCards,
        onReload,
        hit,
        stand
    } = useGame([], numberOfDecks);

    const handleHit = () => {
        hit(playerHand);
    };

    const handleStand = () => {
        stand(playerHand, dealerHand);
    };

    const visualBalance = actualBalance - currentBet;

    const handleBet = (amount) => {
        if (amount > 0) {
            if (currentBet + amount <= actualBalance) {
                setCurrentBet((prev) => prev + amount);
            }
        } else {
            if (currentBet + amount >= 0) {
                setCurrentBet((prev) => prev + amount);
            }
        }
    };

    const handleClearBet = () => {
        setCurrentBet(0);
    };

    const confirmBet = () => {
        if (currentBet === 0) return;

        if (actualBalance >= currentBet) {
            updatePlayerBalance(activePlayerId, actualBalance - currentBet);
            setIsBetPlaced(true);
            dealInitialCards(playerHand, dealerHand);
        } else {
            alert(t("insufficientFunds"));
            handleClearBet();
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
                updatePlayerBalance(activePlayerId, actualBalance + winnings);
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

    const handleRestart = () => {
        setShowModal(false);
        onReload(playerHand, dealerHand);
    };

    return (
        <div className={`${styles.gamePage} ${isAnimating ? styles.animateEnd : ''}`}>
            {(result === "win" || result === "blackjack") && <Confetti/>}

            <div>{t("currentPlayer")}: {playerName}</div>
            <div>{deck.length} {t("cardsLeft")}</div>

            <PlayerHand name="Dealer" cards={dealerHand.hand} reveal={reveal} isDealer={true}/>
            <PlayerHand name="Player" cards={playerHand.hand}/>

            <ChipsControl
                balance={visualBalance}
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

            {isBetPlaced ? (
                <GameControls
                    onHit={handleHit}
                    onStand={handleStand}
                    disabled={result !== null}
                />
            ) : null}

            <Modal isOpen={showModal} title={t("result")} onClose={handleRestart}>
                <ResultPage result={t(`${result}`)} onRestart={handleRestart}/>
            </Modal>
        </div>
    );
}

export default GamePage;