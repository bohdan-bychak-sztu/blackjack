import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PlayerStatsPage.module.css";
import { useTranslation } from "react-i18next";

import usePlayerStore from "../../store/useStore";

export default function PlayerStatsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const player = usePlayerStore((state) => state.players[id]);
    const settings = usePlayerStore((state) => state.settings[id]);
    const stats = usePlayerStore((state) => state.statistics[id]);

    if (!player) {
        return (
            <div className={styles.error}>
                {t("playerNotFound") || "Player not found"}
                <button onClick={() => navigate('/')} className={styles.backButton}>
                    {t("goBack") || "Go Back"}
                </button>
            </div>
        );
    }

    return (
        <div className={styles.statsPage}>
            <div className={styles.playerInfo}>
                <div>
                    <h2>{settings?.name || "Unknown Player"}</h2>

                    <p>{t("balance")}: ${player.balance}</p>
                </div>
            </div>
            <div className={styles.stats}>
                <p>{t("gamesPlayed")}: {stats?.gamesPlayed || 0}</p>
                <p>{t("gamesWon")}: {stats?.gamesWon || 0}</p>
                <p>{t("gamesLost")}: {stats?.gamesLost || 0}</p>
                <p>{t("blackjacks")}: {stats?.blackjacks || 0}</p>
                <p>{t("gamesPushed")}: {stats?.gamesPushed || 0}</p>
            </div>
            <button onClick={() => navigate('/')} className={styles.backButton}>
                {t("backToMenu") || "Back"}
            </button>
        </div>
    );
}