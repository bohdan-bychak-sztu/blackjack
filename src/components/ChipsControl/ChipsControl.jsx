import styles from './Chipscontrol.module.css';
import useChips from '../../hooks/useChips';
import {useTranslation} from "react-i18next";

export default function ChipsControl({balance, currentBet, onBet, isBetPlaced = false}) {
    const {defaultChips} = useChips();
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
                {defaultChips.map((value) => (
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