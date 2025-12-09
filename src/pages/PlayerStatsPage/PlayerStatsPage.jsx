import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext.js";
import styles from "./PlayerStatsPage.module.css";
import {useTranslation} from "react-i18next";

export default function PlayerStatsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { players } = useContext(AppContext);
    const {t} = useTranslation();

    const player = players.players.find((player) => player.id.toString() === id);

    if (!player) {
        return <div className={styles.error}>Player not found</div>;
    }

    return (
        <div className={styles.statsPage}>
            <div className={styles.playerInfo}>
                <div>
                    <h2>{player.settings.name}</h2>
                    <p>{t("balance")}: ${player.balance}</p>
                </div>
            </div>
            <div className={styles.stats}>
                <p>{t("gamesPlayed")}: {player.stats.gamesPlayed}</p>
                <p>{t("gamesWon")}: {player.stats.gamesWon}</p>
                <p>{t("gamesLost")}: {player.stats.gamesLost || 0}</p>
                <p>{t("blackjacks")}: {player.stats.blackjacks || 0}</p>
                <p>{t("gamesPushed")}: {player.stats.gamesPushed || 0}</p>
            </div>
        </div>
    );
}