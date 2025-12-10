import { useEffect } from "react";
import useStore from "../store/useStore";

export default function useAutoLogin() {
    const activePlayerId = useStore((state) => state.activePlayerId);
    const players = useStore((state) => state.players);
    const setActivePlayer = useStore((state) => state.setActivePlayer);
    const addPlayer = useStore((state) => state.addPlayer);

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
    }, [activePlayerId, players, setActivePlayer, addPlayer]);
}