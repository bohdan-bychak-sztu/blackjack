/**
 * Creates a new GDPR slice for the Zustand store.
 * @param {Function} set - The Zustand set function.
 * @returns {object} The GDPR slice.
 */
export const createGDPRSlice = (set) => ({
    gdprConsent: null,

    /**
     * Sets the GDPR consent.
     * @param {boolean} consent The GDPR consent.
     */
    setGDPRConsent: (consent) => set({ gdprConsent: consent }),
});