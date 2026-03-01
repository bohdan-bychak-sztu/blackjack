/**
 * Creates a new statistics slice for the Zustand store.
 * @param {Function} set - The Zustand set function.
 * @param {Function} get - The Zustand get function.
 * @returns {object} The statistics slice.
 */
export const createStatsSlice = (set, get) => ({
    statistics: {},

    /**
     * Registers the result of a game for a player.
     * @param {number} playerId The ID of the player.
     * @param {'win' | 'blackjack' | 'lose' | 'push'} result The result of the game.
     */
    registerGameResult: (playerId, result) => set((state) => {
        const currentStats = state.statistics[playerId] || {
            gamesPlayed: 0, gamesWon: 0, gamesLost: 0, gamesPushed: 0, blackjacks: 0
        };
        const newStats = { ...currentStats };

        newStats.gamesPlayed += 1;
        if (result === "win") newStats.gamesWon += 1;
        else if (result === "blackjack") newStats.blackjacks += 1;
        else if (result === "lose") newStats.gamesLost += 1;
        else if (result === "push") newStats.gamesPushed += 1;

        return {
            statistics: {
                ...state.statistics,
                [playerId]: newStats
            }
        };
    }),
});