import React from "react";
import styles from './Userselectionpage.module.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import usePlayerStore from "../../store/playerStore.js";

export default function UserSelectionPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const playersMap = usePlayerStore((state) => state.players);
    const settingsMap = usePlayerStore((state) => state.settings);
    const activePlayerId = usePlayerStore((state) => state.activePlayerId);

    const addPlayer = usePlayerStore((state) => state.addPlayer);
    const removePlayer = usePlayerStore((state) => state.removePlayer);
    const setActivePlayer = usePlayerStore((state) => state.setActivePlayer);

    const playersList = Object.values(playersMap).map((player) => ({
        ...player,
        name: settingsMap[player.id]?.name || 'Unknown', // Дістаємо ім'я з settings
    }));

    const onAddUser = () => {
        const newName = `Player ${Object.keys(playersMap).length + 1}`;

        const newPlayer = {
            id: Date.now(),
            balance: 1000,
            settings: {
                name: newName,
                deckNumber: 1,
                autoActions: false
            },
            stats: {
                gamesPlayed: 0,
                gamesWon: 0,
                gamesLost: 0,
                gamesPushed: 0,
                blackjacks: 0
            }
        };
        addPlayer(newPlayer);
    };

    const onSelectUser = (userId) => {
        setActivePlayer(userId);
    };

    const onViewStats = (e, userId) => {
        e.stopPropagation();
        navigate(`/player/${userId}`);
    };

    return (
        <div>
            <h2>{t("choseUser")}</h2>
            <div className={styles['user-options']}>
                {playersList.map((player) => (
                    <div
                        key={player.id}
                        className={`${styles['user-option']} ${activePlayerId === player.id ? styles['active'] : ''}`}
                        onClick={() => onSelectUser(player.id)}
                    >
                        <span>{player.name}</span>
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
                                    removePlayer(player.id);
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