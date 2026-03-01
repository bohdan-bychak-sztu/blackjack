/**
 * Creates a new settings slice for the Zustand store.
 * @param {Function} set - The Zustand set function.
 * @param {Function} get - The Zustand get function.
 * @returns {object} The settings slice.
 */
export const createSettingsSlice = (set, get) => ({
    settings: {},

    /**
     * Updates the settings for a player.
     * @param {number} id The ID of the player.
     * @param {object} newSettings The new settings to apply.
     */
    updatePlayerSettings: (id, newSettings) => set((state) => ({
        settings: {
            ...state.settings,
            [id]: { ...state.settings[id], ...newSettings }
        }
    })),
});