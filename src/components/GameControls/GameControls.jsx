import React, {useContext, useEffect} from "react";
import styles from './GameControls.module.css';
import {useTranslation} from "react-i18next";
import AppContext from "../../contexts/AppContext.js";

export default function GameControls({ onHit, onStand, disabled }) {
    const { t } = useTranslation();
    const { settings } = useContext(AppContext);

    useEffect(() => {
        if (settings.userSettings.autoActions && !disabled) {
            const timer = setTimeout(() => {
                onStand();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [settings.userSettings.autoActions, disabled, onStand]);

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
