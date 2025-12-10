import React, { useMemo } from "react";
import styles from './Userselectionpage.module.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { usePlayersData, useGameActions } from "../../store/selectors";
import useStore from "../../store/useStore";

export default function UserSelectionPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { players, settings } = usePlayersData();
    const { addPlayer, removePlayer, setActivePlayer } = useGameActions();
    const activePlayerId = useStore((state) => state.activePlayerId);

    const playersList = useMemo(() => {
        return Object.values(players).map((player) => ({
            ...player,
            name: settings[player.id]?.name || 'Unknown',
        }));
    }, [players, settings]);

    const onAddUser = () => {
        const newName = `Player ${playersList.length + 1}`;
        const newPlayer = {
            id: Date.now(),
            balance: 1000,
            settings: {
                name: newName,
                deckNumber: 1,
                autoActions: false
            },
            stats: {
                gamesPlayed: 0, gamesWon: 0, gamesLost: 0, gamesPushed: 0, blackjacks: 0
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