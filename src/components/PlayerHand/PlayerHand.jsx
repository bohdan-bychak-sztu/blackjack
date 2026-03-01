import React from "react";
import Card from "../Card/Card.jsx";
import styles from './PlayerHand.module.css';
import { calculatePoints } from "../../utils/GameUtil.js";
import useAnimatedHand from "../../hooks/useAnimatedHand.js";

/**
 * A component that displays a player's hand of cards.
 * @param {object} props - The component props.
 * @param {string} props.name - The name of the player.
 * @param {Array<Card>} props.cards - The array of cards in the hand.
 * @param {boolean} [props.reveal=true] - Whether to reveal the cards.
 * @param {boolean} [props.isDealer=false] - Whether the hand belongs to the dealer.
 * @returns {JSX.Element} The rendered player hand.
 */
function PlayerHand({ name, cards = [], reveal = true, isDealer = false }) {
    const { animatedCards, removingCards } = useAnimatedHand(cards);

    return (
        <div className={styles['player-hand']}>
            <div className={styles['player-hand-cards']}>
                {animatedCards.map((card, index) => (
                    <Card
                        className={`${styles['card-enter']} ${
                            removingCards.includes(card) ? styles['card-remove'] : ''
                        }`}
                        style={{
                            rotate: `${index * 10 - (animatedCards.length - 1) * 2.5}deg`,
                            left: `${index * 20}px`,
                        }}
                        {...card}
                        hidden={isDealer && !reveal && index === 0}
                        key={`${card.suit}${card.value}`}
                    />
                ))}
            </div>
            <div className={styles['player-hand-info']}>
                <h2>{name}'s Hand</h2>
                <span className={styles['points-label']}>
                    {reveal || !isDealer ? calculatePoints(animatedCards) : calculatePoints(animatedCards.slice(1))}
                </span>
            </div>
        </div>
    );
}

export default PlayerHand;