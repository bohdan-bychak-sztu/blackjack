import {useEffect, useState} from "react";

export default function usePlayers() {
    const [players, setPlayers] = useState(() => {
        const savedPlayers = localStorage.getItem('players');
        return savedPlayers ? JSON.parse(savedPlayers) : [];
    });

    let activePlayer =
        players.find(player => player.active);

    useEffect(() => {
        console.log('Players updated in usePlayers:', players);
        localStorage.setItem('players', JSON.stringify(players));
    }, [players]);

    const addPlayer = (player) => {
        setPlayers((prevPlayers) => [...prevPlayers, player]);
    }

    const updatePlayer = (id, updatedSettings) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id
                    ? {
                        ...player,
                        settings: { ...player.settings, ...updatedSettings }
                    }
                    : player
            )
        );
    }

    const removePlayer = (id) => {
        setPlayers((prevPlayers) =>
            prevPlayers.filter((player) => player.id !== id)
        );
    }

    const clearPlayers = () => {
        setPlayers([]);
    }

    const setActivePlayer = (id) => {
        setPlayers((prevPlayers) => {
            return prevPlayers.map((player) =>
                player.id === id ? {...player, active: true} : {...player, active: false}
            );
        });
        activePlayer = players.find(player => player.id === id);
    };

    return { players, addPlayer, updatePlayer, removePlayer, clearPlayers, setActivePlayer, activePlayer };
}