import React from "react";
import Card from "../Card/Card.jsx";
import styles from './DealerHand.module.css';
import {calculatePoints} from "../../utils/GameUtil.js";

function DealerHand({cards=[], reveal= false}){
    return (
        <div className={styles['dealer-hand']}>
            <div className={styles['dealer-hand-cards']}>
                {cards.map((card, index) => (
                    <Card style={{rotate: index * 10 - (cards.length - 1) * 2.5 + 'deg', left: index * 20 + 'px'}}
                          {...card} hidden={!reveal && index === 0} index={index} key={`${card.suit}${card.value}`}/>
                ))}
            </div>
            <div className={styles['dealer-hand-info']}>
                <h2>Dealer's Hand</h2>
                <span className={styles['points-label']}>{calculatePoints(cards)}</span>
            </div>
        </div>
    );
}

export default DealerHand;