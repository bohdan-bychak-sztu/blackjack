import React from "react";
import Card from "../Card/Card.jsx";
import styles from './PlayerHand.module.css';
import {calculatePoints} from "../../utils/GameUtil.js";

function PlayerHand({name, cards=[]}){
    return (
        <div className={styles['player-hand']}>
            <div className={styles['player-hand-cards']} >
                {cards.map((card, index) => (
                    <Card style={{rotate: index * 10 - (cards.length -1) * 2.5 + 'deg', left: index * 20 + 'px'}}
                          {...card} hidden={false} key={`${card.suit}${card.value}`}/>
                ))}
            </div>
            <div className={styles['player-hand-info']}>
                <h2>{name}'s Hand</h2>
                <span className={styles['points-label']}>{calculatePoints(cards)}</span>
            </div>
        </div>
    );
}

export default PlayerHand;