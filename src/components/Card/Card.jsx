import React from "react";
import styles from "./Card.module.css";

const getCardImage = (value, suit, hidden) => {
    const baseUrl = import.meta.env.BASE_URL || "/";
    if (hidden) {
        return `${baseUrl}cards/red_back.png`;
    }
    return `${baseUrl}cards/${value}${suit}.png`;
};


/**
 * Компонент гральної карти.
 * * @component
 * @param {Object} props - Властивості компонента.
 * @param {string} props.value - Номінал (2-10, J, Q, K, A).
 * @param {string} props.suit - Масть (H, D, C, S).
 * @param {boolean} [props.hidden=true] - Чи прихована карта.
 * @param {Object} [props.style] - Додаткові CSS стилі.
 */
function Card({ value, suit, hidden = false, width = 100, style = {} }) {
    const cardStyle = {
        width: `${width}px`,
        height: `${width * 1.5}px`,
        ...style
    };

    const altText = hidden ? "Hidden Card" : `${value} of ${suit}`;

    return (
        <div className={styles.card} style={cardStyle}>
            <img
                src={getCardImage(value, suit, hidden)}
                alt={altText}
                className={styles.cardImage}
            />
        </div>
    );
}

export default Card;