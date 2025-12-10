export const createPlayerSlice = (set, get) => ({
    players: {},
    activePlayerId: null,

    setActivePlayer: (id) => set({ activePlayerId: id }),

    addPlayer: (player) => set((state) => ({
        players: {
            ...state.players,
            [player.id]: { id: player.id, balance: player.balance || 1000 },
        },
        settings: {
            ...state.settings,
            [player.id]: player.settings || { name: 'Player', deckNumber: 1 },
        },
        statistics: {
            ...state.statistics,
            [player.id]: player.stats || { gamesPlayed: 0, gamesWon: 0 },
        }
    })),

    removePlayer: (id) => set((state) => {
        const { [id]: removedPlayer, ...remainingPlayers } = state.players;
        const { [id]: removedSettings, ...remainingSettings } = state.settings;
        const { [id]: removedStats, ...remainingStats } = state.statistics;

        return {
            players: remainingPlayers,
            settings: remainingSettings,
            statistics: remainingStats,
            activePlayerId: state.activePlayerId === id ? null : state.activePlayerId
        };
    }),

    updatePlayerBalance: (id, newBalance) => set((state) => ({
        players: {
            ...state.players,
            [id]: { ...state.players[id], balance: newBalance }
        }
    })),
});