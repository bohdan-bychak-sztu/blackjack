import React, { useEffect } from "react";
import styles from './GameControls.module.css';
import { useTranslation } from "react-i18next";
import usePlayerStore from "../../store/playerStore.js";
// 1. Імпортуємо стор

export default function GameControls({ onHit, onStand, disabled }) {
    const { t } = useTranslation();

    const autoActions = usePlayerStore((state) => {
        const activeId = state.activePlayerId;
        if (activeId && state.settings[activeId]) {
            return state.settings[activeId].autoActions;
        }
        return false; // За замовчуванням
    });

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