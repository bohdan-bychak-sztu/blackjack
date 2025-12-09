import { useEffect, useState } from "react";

export default function useSettings(user = "default") {
    const [userSettings, setUserSettings] = useState(() => {
        const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
        const activePlayer = savedPlayers.find(player => player.id.toString() === user);
        return activePlayer?.settings || {};
    });

    const updateLocalStorage = (updatedSettings) => {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const updatedPlayers = players.map(player => {
            if (player.id.toString() === user) {
                return {
                    ...player,
                    settings: updatedSettings,
                    stats: player.stats || { gamesPlayed: 0, gamesWon: 0 }
                };
            }
            return player;
        });

        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };

    useEffect(() => {
        updateLocalStorage(userSettings);
    }, [userSettings]);

    const setSettings = (newSettings) => {
        setUserSettings(() => {
            updateLocalStorage(newSettings);
            return newSettings;
        });
    };

    const changeUser = (newUser) => {
        const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
        const selectedPlayer = savedPlayers.find(player => player.id === newUser);
        setUserSettings(selectedPlayer?.settings || {});
    }

    return { userSettings, setSettings, changeUser };
}