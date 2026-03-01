import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {createPlayerSlice} from "./slices/createPlayerSlice.js";
import {createSettingsSlice} from "./slices/createSettingsSlice.js";
import {createStatsSlice} from "./slices/createStatsSlice.js";
import {createGDPRSlice} from "./slices/createGDPRSlice.js";


const useStore = create(
    persist(
        (...a) => ({
            ...createPlayerSlice(...a),
            ...createSettingsSlice(...a),
            ...createStatsSlice(...a),
            ...createGDPRSlice(...a),
        }),
        {
            name: 'blackjack-storage',
            partialize: state => {
                if (state.gdprConsent === true) return state;
                return {
                    gdprConsent: state.gdprConsent
                };
            }
        }
    )
);

export default useStore;