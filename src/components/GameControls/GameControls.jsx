import React, { useEffect } from "react";
import styles from './GameControls.module.css';
import { useTranslation } from "react-i18next";

import { useActivePlayer } from "../../store/selectors";

export default function GameControls({ onHit, onStand, disabled }) {
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