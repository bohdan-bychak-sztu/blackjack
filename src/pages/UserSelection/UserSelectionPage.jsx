import React from "react";
import {Link, useNavigate} from "react-router";
import styles from './Userselectionpage.module.css';
import usePlayers from "../../hooks/usePlayers.js";
import useSettings from "../../hooks/useSettings.js";

export default function UserSelectionPage() {
    const {players, addPlayer, updatePlayer, removePlayer, clearPlayers, activePlayer, setActivePlayer} = usePlayers();
    const {userSettings, setSettings} = useSettings(activePlayer ? activePlayer.id.toString() : "default");
    const navigate = useNavigate();

    const onAddUser = () => {
        const newPlayer = {
            id: Date.now(),
            name: `Player ${players.length + 1}`,
            stats: {
                gamesPlayed: 0,
                gamesWon: 0
            },
            settings: {

            }
        }
        addPlayer(newPlayer);
    }

    const onSelectUser = (userId) => {
        setActivePlayer(userId);
        navigate('/game', { state: { refresh: Date.now() } });
    }

    return (
        <div>
            <h2>Обери профіль гравця</h2>
            <div className={styles['user-options']}>
                {players.map((player) => (
                    <div key={player.id} className={styles['user-option'] + (activePlayer && activePlayer.id === player.id ? ` ${styles['active']}` : '')}
                         onClick={() => onSelectUser(player.id)}
                    >
                        <span>{player.name}</span>
                        <button className={styles['delete']} onClick={() => removePlayer(player.id)}>X</button>
                    </div>
                ))}
            </div>

            <button onClick={onAddUser}>Додати гравця</button>
        </div>
    );
}
