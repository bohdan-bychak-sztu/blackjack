import React, {useContext} from "react";
import styles from './Userselectionpage.module.css';
import AppContext from "../../contexts/AppContext.js";
import {useTranslation} from "react-i18next";

export default function UserSelectionPage() {
    const {players, settings} = useContext(AppContext);
    const { t } = useTranslation();

    const onAddUser = () => {
        const newPlayer = {
            id: Date.now(),
            stats: {
                gamesPlayed: 0,
                gamesWon: 0
            },
            settings: {
                name: `Player ${players.players.length + 1}`,
            }
        }
        players.addPlayer(newPlayer);
    }

    const onSelectUser = (userId) => {
        players.setActivePlayer(userId);
        settings.changeUser(userId);
    }

    return (
        <div>
            <h2>{t("choseUser")}</h2>
            <div className={styles['user-options']}>
                {players.players.map((player) => (
                    <div key={player.id} className={styles['user-option'] + (players.activePlayer && players.activePlayer.id === player.id ? ` ${styles['active']}` : '')}
                         onClick={() => onSelectUser(player.id)}
                    >
                        <span>{player.settings.name}</span>
                        <button className={styles['delete']} onClick={() => players.removePlayer(player.id)}>X</button>
                    </div>
                ))}
            </div>

            <button onClick={onAddUser}>{t("addUser")}</button>
        </div>
    );
}
