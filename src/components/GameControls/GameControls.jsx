import React from "react";
import styles from './GameControls.module.css';

export default function GameControls({ onHit, onStand, disabled }) {
    return (
        <div className={styles['controls']}>
            <button onClick={onHit} disabled={disabled}>
                Hit
            </button>
            <button onClick={onStand} disabled={disabled}>
                Stand
            </button>
        </div>
    );
}
