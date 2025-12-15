import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import PlayerHand from "../../components/PlayerHand/PlayerHand.jsx";
import GameControls from "../../components/GameControls/GameControls.jsx";
import allCards from "../../data/cards.js";
import Modal from "../../components/Modal/Modal.jsx";
import ResultPage from "../ResultPage.jsx";
import useHand from "../../hooks/useHand.js";
import useGame from "../../hooks/useGame.js";
import { calculateWinnings, shuffle } from "../../utils/GameUtil.js";
import ChipsControl from "../../components/ChipsControl/ChipsControl.jsx";
import styles from './GamePage.module.css';
import loseSoundFile from "../../assets/sounds/lose.mp3";
import winSoundFile from "../../assets/sounds/win.mp3";
import blackjackSoundFile from "../../assets/sounds/blackjack.mp3";
import useSound from "../../hooks/useSound.js";
import { useTranslation } from "react-i18next";
import { useActivePlayer, useGameActions } from "../../store/selectors";
import { useWindowSize } from 'react-use'
import {createPortal} from "react-dom";

function GamePage() {
    const { t } = useTranslation();

    const player = useActivePlayer();
    const { updateBalance, registerResult } = useGameActions();

    const numberOfDecks = player?.settings?.deckNumber || 1;
    const playerName = player?.settings?.name || "Player";
    const actualBalance = player?.balance || 0;

    const [isAnimating, setIsAnimating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentBet, setCurrentBet] = useState(0);
    const [isBetPlaced, setIsBetPlaced] = useState(false);
    const { width, height } = useWindowSize()

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

    const visualBalance = isBetPlaced ? actualBalance : actualBalance - currentBet;

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
        if (!player) return;
        if (currentBet === 0) return;

        if (actualBalance >= currentBet) {
            updateBalance(player.id, actualBalance - currentBet);
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
        console.log(result);
        if (result) {
            const winnings = calculateWinnings(currentBet, result);

            if (player) {
                if (winnings > 0) {
                    updateBalance(player.id, actualBalance + winnings);
                }
                registerResult(player.id, result);
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

    if (!player) {
        return <div className={styles.loading}>Loading player data...</div>;
    }

    return (
        <div className={`${styles.gamePage} ${isAnimating ? styles.animateEnd : ''}`}>
            {(result === "win" || result === "blackjack") &&
                createPortal(
                    <Confetti
                        numberOfPieces={500}
                        width={width}
                        height={height}
                        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
                    />,
                    document.body
                )
            }

            <div>{t("currentPlayer")}: {playerName}</div>
            <div>{deck.length} {t("cardsLeft")}</div>

            <PlayerHand name="Dealer" cards={dealerHand.hand} reveal={reveal} isDealer={true} />
            <PlayerHand name="Player" cards={playerHand.hand} />

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

                    {actualBalance < 10 && currentBet === 0 && (
                        <button
                            className={styles.resetButton}
                            onClick={() => updateBalance(player.id, 1000)}
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
                <ResultPage result={t(`${result}`)} onRestart={handleRestart} />
            </Modal>
        </div>
    );
}

export default GamePage;