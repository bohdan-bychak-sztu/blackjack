import { useShallow } from 'zustand/react/shallow';
import useStore from './useStore';

const DEFAULT_SETTINGS = { name: 'Unknown', deckNumber: 1, autoActions: false };
const DEFAULT_STATS = { gamesPlayed: 0, gamesWon: 0, gamesLost: 0, gamesPushed: 0, blackjacks: 0 };

export const useActivePlayer = () => {
    return useStore(
        useShallow((state) => {
            const activeId = state.activePlayerId;
            if (!activeId) return null;

            const player = state.players[activeId];
            const settings = state.settings[activeId];
            const stats = state.statistics[activeId];

            if (!player) return null;

            return {
                ...player,
                settings: settings || DEFAULT_SETTINGS,
                stats: stats || DEFAULT_STATS
            };
        })
    );
};

export const useGameActions = () => {
    return useStore(
        useShallow((state) => ({
            addPlayer: state.addPlayer,
            removePlayer: state.removePlayer,
            setActivePlayer: state.setActivePlayer,
            updateBalance: state.updatePlayerBalance,
            updateSettings: state.updatePlayerSettings,
            registerResult: state.registerGameResult,
        }))
    );
};

export const usePlayersData = () => {
    return useStore(
        useShallow((state) => ({
            players: state.players,
            settings: state.settings
        }))
    );
};