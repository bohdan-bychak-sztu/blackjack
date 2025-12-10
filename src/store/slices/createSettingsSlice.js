export const createSettingsSlice = (set, get) => ({
    settings: {},

    updatePlayerSettings: (id, newSettings) => set((state) => ({
        settings: {
            ...state.settings,
            [id]: { ...state.settings[id], ...newSettings }
        }
    })),
});