import { useEffect } from "react";
import usePlayerStore from "../store/playerStore.js";

export default function useAutoLogin() {
    const activePlayerId = usePlayerStore((state) => state.activePlayerId);
    const players = usePlayerStore((state) => state.players);
    const setActivePlayer = usePlayerStore((state) => state.setActivePlayer);
    const addPlayer = usePlayerStore((state) => state.addPlayer);

    useEffect(() => {
        if (activePlayerId) return;
        const playerIds = Object.keys(players);

        if (playerIds.length > 0) {
            setActivePlayer(playerIds[0]);
        } else {
            const newId = Date.now().toString();
            addPlayer({
                id: newId,
                balance: 1000,
                settings: { name: "Player 1", deckNumber: 1, autoActions: false },
                stats: { gamesPlayed: 0, gamesWon: 0, gamesLost: 0, gamesPushed: 0, blackjacks: 0 }
            });
            setActivePlayer(newId);
        }
    }, []);
}