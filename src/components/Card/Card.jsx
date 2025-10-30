import React from "react";
import styles from "./Card.module.css"

function getCardImage(value, suit, hidden = false) {
    if (hidden) {
        return `${import.meta.env.BASE_URL}cards/red_back.png`;
    }
    return `${import.meta.env.BASE_URL}cards/${value}${suit}.png`;

}

function Card({value, suit, style = {}, hidden = true}) {
    return (
        <div className={styles['card']} style={style}>
            <img src={getCardImage(value, suit, hidden)} alt={`${value} of ${suit}`} className={styles['cardImage']} />
        </div>
    );
}

export default Card;