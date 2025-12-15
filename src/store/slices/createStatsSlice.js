export const createStatsSlice = (set, get) => ({
    statistics: {},

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