import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultPlayerState = {
    players: {},
    settings: {},
    statistics: {},
    activePlayerId: null
};

const usePlayerStore = create(
    persist(
        (set, get) => ({
            ...defaultPlayerState,

            addPlayer: (player) => {
                set((state) => ({
                    players: {
                        ...state.players,
                        [player.id]: { id: player.id, balance: player.balance || 1000 },
                    },
                    settings: {
                        ...state.settings,
                        [player.id]: player.settings || { name: 'Default Player', deckNumber: 1, autoActions: true },
                    },
                    statistics: {
                        ...state.statistics,
                        [player.id]: player.stats || {
                            gamesPlayed: 0,
                            gamesWon: 0,
                            gamesLost: 0,
                            gamesPushed: 0,
                            blackjacks: 0,
                        },
                    },
                }));
            },

            removePlayer: (playerId) => {
                set((state) => {
                    const { [playerId]: _, ...remainingPlayers } = state.players;
                    const { [playerId]: __, ...remainingSettings } = state.settings;
                    const { [playerId]: ___, ...remainingStatistics } = state.statistics;

                    return {
                        players: remainingPlayers,
                        settings: remainingSettings,
                        statistics: remainingStatistics,
                        activePlayerId: state.activePlayerId === playerId ? null : state.activePlayerId,
                    };
                });
            },

            updatePlayerSettings: (playerId, newSettings) => {
                set((state) => ({
                    settings: {
                        ...state.settings,
                        [playerId]: { ...state.settings[playerId], ...newSettings },
                    },
                }));
            },

            updatePlayerStats: (playerId, newStats) => {
                set((state) => ({
                    statistics: {
                        ...state.statistics,
                        [playerId]: { ...state.statistics[playerId], ...newStats },
                    },
                }));
            },

            updatePlayerBalance: (playerId, newBalance) => {
                set((state) => ({
                    players: {
                        ...state.players,
                        [playerId]: { ...state.players[playerId], balance: newBalance },
                    },
                }));
            },

            setActivePlayer: (playerId) => {
                set({ activePlayerId: playerId });
            },
            registerGameResult: (playerId, result) => {
                set((state) => {
                    const currentStats = state.statistics[playerId];
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
                });
            },
        }),
        {
            name: 'playerStore',
        }
    )
);

export default usePlayerStore;