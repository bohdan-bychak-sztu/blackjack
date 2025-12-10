import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {createPlayerSlice} from "./slices/createPlayerSlice.js";
import {createSettingsSlice} from "./slices/createSettingsSlice.js";
import {createStatsSlice} from "./slices/createStatsSlice.js";


const useStore = create(
    persist(
        (...a) => ({
            ...createPlayerSlice(...a),
            ...createSettingsSlice(...a),
            ...createStatsSlice(...a),
        }),
        {
            name: 'blackjack-storage',
        }
    )
);

export default useStore;