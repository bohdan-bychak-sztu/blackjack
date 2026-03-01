import React, { useEffect } from "react";
import styles from './GameControls.module.css';
import { useTranslation } from "react-i18next";

import { useActivePlayer } from "../../store/selectors";

/**
 * A component that displays the game controls (Hit and Stand buttons).
 * @param {object} props - The component props.
 * @param {Function} props.onHit - A function to call when the "Hit" button is clicked.
 * @param {Function} props.onStand - A function to call when the "Stand" button is clicked.
 * @param {boolean} props.disabled - Whether the controls are disabled.
 * @returns {JSX.Element} The rendered game controls.
 */
function GameControls({ onHit, onStand, disabled }) {
    const { t } = useTranslation();

    const player = useActivePlayer();

    const autoActions = player?.settings?.autoActions || false;

    useEffect(() => {
        if (autoActions && !disabled) {
            const timer = setTimeout(() => {
                onStand();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [autoActions, disabled, onStand]);

    return (
        <div className={styles['controls']}>
            <button onClick={onHit} disabled={disabled}>
                {t("hit")}
            </button>
            <button onClick={onStand} disabled={disabled}>
                {t("stand")}
            </button>
        </div>
    );
}

export default GameControls