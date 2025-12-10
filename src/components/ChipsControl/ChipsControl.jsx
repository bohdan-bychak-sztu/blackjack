import React from "react";
import { CHIPS_VALUES } from "../../utils/GameUtil.js"; // Перевірте шлях
import styles from "./ChipsControl.module.css";
import { useTranslation } from "react-i18next";

export default function ChipsControl({ balance, currentBet, onBet, isBetPlaced }) {
    const { t } = useTranslation();

    const handleRightClick = (e, value) => {
        e.preventDefault();
        if (!isBetPlaced) {
            onBet(-value);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.infoPanel}>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t("balance")}</span>
                    <span>${balance}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t("bet")}</span>
                    <span>${currentBet}</span>
                </div>
            </div>

            <div className={styles.chipsRow}>
                {CHIPS_VALUES.map((value) => (
                    <button
                        key={value}
                        className={`${styles.chip} ${styles[`chip${value}`]}`}
                        disabled={isBetPlaced || (balance < value && currentBet === 0)}
                        onClick={() => onBet(value)}
                        onContextMenu={(e) => handleRightClick(e, value)}
                        title={`Add $${value} (Right click to remove)`}
                    >
                        {value}
                    </button>
                ))}
            </div>

            {!isBetPlaced && (
                <p className={styles.hint}>
                    {t("chipsControlHint")}
                </p>
            )}
        </div>
    );
}