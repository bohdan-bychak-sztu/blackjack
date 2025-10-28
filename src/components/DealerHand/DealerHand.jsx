import React from "react";
import Card from "../Card/Card.jsx";
import styles from './DealerHand.module.css';

function DealerHand({cards=[], reveal= false}){
    return (
        <div className={styles['dealer-hand']}>
            <h2>Dealer's Hand</h2>
            <div className={styles['dealer-hand-cards']}>
                {cards.map((card, index) => (
                    <Card {...card} hidden={!reveal && index === 0} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default DealerHand;