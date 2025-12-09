import styles from './Chipscontrol.module.css';
import {useTranslation} from "react-i18next";
import {CHIPS_VALUES} from "../../utils/GameUtil.js";

export default function ChipsControl({balance, currentBet, onBet, isBetPlaced = false}) {
    const { t } = useTranslation();

    const handleChipClick = (value) => {
        if (balance >= value) {
            onBet(value);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.balance}>{t("balance")}: ${balance}</div>
            <div className={styles.currentBet}>{t("currentBet")}: ${currentBet}</div>
            {!isBetPlaced ? <div className={styles.chipsContainer}>
                {CHIPS_VALUES.map((value) => (
                    <div
                        key={value}
                        className={styles.chip}
                        data-value={value}
                        onClick={() => handleChipClick(value)}
                    >
                        ${value}
                    </div>
                ))}
            </div> : null
            }
        </div>
    );
}