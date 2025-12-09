import {useEffect, useState} from "react";

export default function usePlayers() {
    const [players, setPlayers] = useState(() => {
        const savedPlayers = localStorage.getItem('players');
        if (savedPlayers) {
            return JSON.parse(savedPlayers);
        }
        return [
            {
                id: Date.now(),
                settings: { name: "Default Player" },
                stats: {
                    gamesPlayed: 0,
                    gamesWon: 0,
                    gamesLost: 0,
                    blackjacks: 0,
                    gamesPushed: 0,
                },
                balance: 1000,
                active: true,
            },
        ];
    });

    let activePlayer = players.find(player => player.active);

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
                        settings: {...player.settings, ...updatedSettings}
                    }
                    : player
            )
        );
    }

    const updatePlayerStats = (id, result) => {
        setPlayers(
            JSON.parse(localStorage.getItem('players')).map((player) => {
                if (player.id === id) {
                    const updatedStats = {...player.stats};
                    updatedStats.gamesPlayed += 1;
                    if (result === "win") updatedStats.gamesWon += 1;
                    else if (result === "blackjack") updatedStats.blackjacks += 1;
                    else if (result === "lose") updatedStats.gamesLost += 1;
                    else if (result === "push") updatedStats.gamesPushed += 1;

                    return {...player, stats: updatedStats};
                }
                return player;
            })
        );
    };

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

    return {
        players,
        addPlayer,
        updatePlayer,
        updatePlayerStats,
        removePlayer,
        clearPlayers,
        setActivePlayer,
        activePlayer
    };
}