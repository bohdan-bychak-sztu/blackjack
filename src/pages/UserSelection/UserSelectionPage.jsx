import React, {useContext} from "react";
import styles from './Userselectionpage.module.css';
import AppContext from "../../contexts/AppContext.js";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router";

export default function UserSelectionPage() {
    const {players, settings} = useContext(AppContext);
    const {t} = useTranslation();
    const navigate = useNavigate();

    const onAddUser = () => {
        const newPlayer = {
            id: Date.now(),
            stats: {
                gamesPlayed: 0,
                gamesWon: 0,
                gamesLost: 0,
                gamesPushed: 0,
                blackjacks: 0
            },
            settings: {
                name: `Player ${players.players.length + 1}`,
            },
            balance: 1000,
        };
        players.addPlayer(newPlayer);
    };

    const onSelectUser = (userId) => {
        players.setActivePlayer(userId);
        settings.changeUser(userId);
    };

    const onViewStats = (e, userId) => {
        e.stopPropagation();
        navigate(`/player/${userId}`);
    };

    return (
        <div>
            <h2>{t("choseUser")}</h2>
            <div className={styles['user-options']}>
                {players.players.map((player) => (
                    <div
                        key={player.id}
                        className={`${styles['user-option']} ${players.activePlayer && players.activePlayer.id === player.id ? styles['active'] : ''}`}
                        onClick={() => onSelectUser(player.id)}
                    >
                        <span>{player.settings.name}</span>
                        <div className={styles['actions']}>
                            <button
                                className={styles['stats-link']}
                                onClick={(e) => onViewStats(e, player.id)}
                            >
                                {t("viewStats")}
                            </button>
                            <button
                                className={styles['delete']}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    players.removePlayer(player.id);
                                }}
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={onAddUser}>{t("addUser")}</button>
        </div>
    );
}