import { useEffect, useState } from "react";

export default function useSettings(user = "default") {
    const [userSettings, setUserSettings] = useState(() => {
        const savedSettings = JSON.parse(localStorage.getItem('players')).filter(player => player.id.toString() === user)[0]?.settings;
        return savedSettings ? savedSettings : {};
    });

    const updateLocalStorage = (updatedSettings) => {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const updatedPlayers = players.map(player =>
            player.id.toString() === user ? { ...player, settings: updatedSettings } : player
        );
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };

    useEffect(() => {
        updateLocalStorage(userSettings);
    }, [user, userSettings]);

    const addUserSetting = (key, value) => {
        setUserSettings((prevSettings) => {
            const updatedSettings = { ...prevSettings, [key]: value };
            updateLocalStorage(updatedSettings);
            return updatedSettings;
        });
    };

    const removeUserSetting = (key) => {
        setUserSettings((prevSettings) => {
            const { [key]: _, ...rest } = prevSettings;
            updateLocalStorage(rest);
            return rest;
        });
    };

    const clearSettings = () => {
        setUserSettings(() => {
            updateLocalStorage({});
            return {};
        });
    };

    const setSettings = (newSettings) => {
        setUserSettings(() => {
            updateLocalStorage(newSettings);
            return newSettings;
        });
    };

    const changeUser = (newUser) => {
        const savedSettings = JSON.parse(localStorage.getItem('players')).filter(player => player.id.toString() === newUser)[0]?.settings;
        setUserSettings(savedSettings ? savedSettings : {});
    }

    return { userSettings, addUserSetting, removeUserSetting, clearSettings, setSettings, changeUser };
}