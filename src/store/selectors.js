import { useShallow } from 'zustand/react/shallow';
import useStore from './useStore';

const DEFAULT_SETTINGS = { name: 'Unknown', deckNumber: 1, autoActions: false };
const DEFAULT_STATS = { gamesPlayed: 0, gamesWon: 0, gamesLost: 0, gamesPushed: 0, blackjacks: 0 };

/**
 * A hook that returns the active player's data.
 * @returns {object | null} The active player's data, or null if there is no active player.
 */
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

/**
 * A hook that returns a set of game actions.
 * @returns {{addPlayer: Function, removePlayer: Function, setActivePlayer: Function, updatePlayerBalance: Function, updatePlayerSettings: Function, registerGameResult: Function}} An object containing game action functions.
 */
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

/**
 * A hook that returns all players' data.
 * @returns {{players: object, settings: object, statistics: object}} An object containing all players, settings, and statistics.
 */
export const usePlayersData = () => {
    return useStore(
        useShallow((state) => ({
            players: state.players,
            settings: state.settings
        }))
    );
};