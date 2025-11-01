import {useEffect, useState} from "react";

export default function usePlayers() {
    const [players, setPlayers] = useState(() => {
        const savedPlayers = localStorage.getItem('players');
        return savedPlayers ? JSON.parse(savedPlayers) : [];
    });

    const activePlayer = () =>
        players.find(player => player.active);

    useEffect(() => {
        localStorage.setItem('players', JSON.stringify(players));
    }, [players]);

    const addPlayer = (player) => {
        setPlayers((prevPlayers) => [...prevPlayers, player]);
    }

    const updatePlayer = (id, updatedPlayer) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id ? {...player, ...updatedPlayer} : player
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
            const updatedPlayers = prevPlayers.map((player) =>
                player.id === id ? { ...player, active: true } : { ...player, active: false }
            );
            return updatedPlayers;
        });
    };

    return { players, addPlayer, updatePlayer, removePlayer, clearPlayers, setActivePlayer, activePlayer };
}