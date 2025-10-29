import React from "react";
import styles from "./Card.module.css"

function getCardImage(value, suit, hidden = false) {
    if (hidden) {
        return "/cards/red_back.png";
    }
    return `/cards/${value}${suit}.png`;

}

function Card({value, suit, style = {}, hidden = true}) {
    return (
        <div className={styles['card']} style={style}>
            <img src={getCardImage(value, suit, hidden)} alt={`${value} of ${suit}`} className={styles['cardImage']} />
        </div>
    );
}

export default Card;