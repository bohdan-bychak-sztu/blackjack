/**
 * Creates a new player slice for the Zustand store.
 * @param {Function} set - The Zustand set function.
 * @param {Function} _get - The Zustand get function.
 * @returns {object} The player slice.
 */
export const createPlayerSlice = (set, _get) => ({
    players: {},
    activePlayerId: null,

    /**
     * Sets the active player.
     * @param {number} id The ID of the player to set as active.
     */
    setActivePlayer: (id) => set({ activePlayerId: id }),

    /**
     * Adds a new player to the store.
     * @param {object} player The player object to add.
     */
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

    /**
     * Removes a player from the store.
     * @param {number} id The ID of the player to remove.
     */
    removePlayer: (id) => set((state) => {
        const { [id]: _removedPlayer, ...remainingPlayers } = state.players;
        const { [id]: _removedSettings, ...remainingSettings } = state.settings;
        const { [id]: _removedStats, ...remainingStats } = state.statistics;

        return {
            players: remainingPlayers,
            settings: remainingSettings,
            statistics: remainingStats,
            activePlayerId: state.activePlayerId === id ? null : state.activePlayerId
        };
    }),

    /**
     * Updates the balance of a player.
     * @param {number} id The ID of the player.
     * @param {number} newBalance The new balance of the player.
     */
    updatePlayerBalance: (id, newBalance) => set((state) => ({
        players: {
            ...state.players,
            [id]: { ...state.players[id], balance: newBalance }
        }
    })),
});