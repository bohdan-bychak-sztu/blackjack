import React from "react";
import Card from "../Card/Card.jsx";
import styles from './PlayerHand.module.css';

function PlayerHand({name, cards=[]}){
    const points = cards.reduce((total, card) => {
        let value = 0;
        if (['J', 'Q', 'K'].includes(card.value)) {
            value = 10;
        } else if (card.value === 'A') {
            value = 11;
        } else {
            value = parseInt(card.value);
        }
        return total + value;
    }, 0);

    return (
        <div className={styles['player-hand']}>
            <h2>{name}'s Hand</h2>
            <div className={styles['player-hand-cards']}>
                {cards.map((card, index) => (
                    <Card {...card} hidden={false} key={index}/>
                ))}
            </div>
            <p>Points: {points}</p>
        </div>
    );
}

export default PlayerHand;